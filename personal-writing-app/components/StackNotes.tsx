'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Note } from '@/types/note'

interface StackNotesProps {
  stackName: string
}

export default function StackNotes({ stackName }: StackNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`/api/notes?stack=${encodeURIComponent(stackName)}`)
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    }

    fetchNotes()
  }, [stackName])

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{stackName}</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
      />
      <ul className="space-y-2">
        {filteredNotes.map((note) => (
          <li key={note.id} className="border p-2 rounded hover:bg-gray-100">
            <Link href={`/note/${note.id}`}>
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-600">{new Date(note.createdAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

