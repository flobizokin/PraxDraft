'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Canvas from '@/components/Canvas'
import Breadcrumb from '@/components/Breadcrumb'

export default function NotePage() {
  const { title } = useParams()
  const [note, setNote] = useState(null)

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/api/notes?title=${encodeURIComponent(title)}`)
      if (response.ok) {
        const data = await response.json()
        setNote(data)
      }
    }

    fetchNote()
  }, [title])

  if (!note) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen p-4">
      <Breadcrumb />
      <Canvas initialContent={note.content} initialTitle={note.title} />
    </main>
  )
}

