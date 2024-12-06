'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { Attachment, Note, NoteVersion } from '@/types/note'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import VersionHistory from './VersionHistory'
import { offlineStorage } from '@/utils/offlineStorage'
import ReactMarkdown from 'react-markdown'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

interface CanvasProps {
  initialNote?: Note
}

export default function Canvas({ initialNote }: CanvasProps) {
  const [note, setNote] = useState<Note>(initialNote || {
    id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    stacks: [],
    tags: [],
    links: [],
    attachments: []
  })
  const router = useRouter()
  const debouncedNote = useDebounce(note, 1000)

  const saveNote = useCallback(async (noteToSave: Note) => {
    const method = noteToSave.id ? 'PUT' : 'POST'
    const response = await fetch('/api/notes', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteToSave),
    })

    if (response.ok) {
      console.log('Note saved successfully')
      if (!noteToSave.id) {
        const data = await response.json()
        router.push(`/note/${data.id}`)
      }
    } else {
      console.error('Failed to save note')
    }
  }, [router])

  useEffect(() => {
    if (debouncedNote.title || debouncedNote.content) {
      saveNote(debouncedNote)
    }
  }, [debouncedNote, saveNote])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({...note, content: e.target.value, updatedAt: new Date().toISOString()})

    // Check for [[link-title]] syntax
    const linkMatch = e.target.value.match(/\[\[(.*?)\]\]/)
    if (linkMatch) {
      const linkTitle = linkMatch[1]
      // Check if note exists, if not, offer to create
      fetch(`/api/notes?title=${encodeURIComponent(linkTitle)}`)
        .then(res => {
          if (res.status === 404) {
            if (confirm(`Note "${linkTitle}" doesn't exist. Create it?`)) {
              router.push(`/note/new?title=${encodeURIComponent(linkTitle)}`)
            }
          }
        })
    }
  }

  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({...note, stacks: e.target.value.split(',').map(stack => stack.trim()), updatedAt: new Date().toISOString()})
  }

  const handleStackClick = (stack: string) => {
    // Implement stack click handling logic here
  }

  const handleAttachment = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const attachment: Attachment = {
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      }
      setNote({...note, attachments: [...note.attachments, attachment], updatedAt: new Date().toISOString()})
    }
  }

  const handleEditorChange = ({ html, text }: any) => {
    setNote({ ...note, content: text, updatedAt: new Date().toISOString() })
  }

  const handleVersionRestore = (restoredNote: NoteVersion) => {
    setNote(prevNote => ({
      ...prevNote,
      content: restoredNote.content,
      updatedAt: restoredNote.timestamp
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({...note, title: e.target.value, updatedAt: new Date().toISOString()})}
          placeholder="Note Title"
          className="w-full p-2 text-2xl font-bold border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {note.stacks.map((stack) => (
            <button
              key={stack}
              onClick={() => handleStackClick(stack)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
            >
              #{stack}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <MdEditor
          value={note.content}
          onChange={handleEditorChange}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          className="h-[calc(100vh-400px)]"
          plugins={[
            'header',
            'font-bold',
            'font-italic',
            'font-strikethrough',
            'list-unordered',
            'list-ordered',
            'block-quote',
            'block-wrap',
            'block-code-inline',
            'block-code-block',
            'table',
            'image',
            'link',
            'clear',
            'logger',
            'mode-toggle',
            'full-screen',
            'tab-insert'
          ]}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <input type="file" onChange={handleAttachment} />
        {note.attachments.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type.startsWith('image/') ? (
              <img src={attachment.url} alt={attachment.name} className="max-w-xs max-h-32" />
            ) : (
              <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <VersionHistory noteId={note.id} onVersionRestore={handleVersionRestore} />
      </div>
    </div>
  )
}

