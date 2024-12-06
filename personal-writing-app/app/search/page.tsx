'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BurgerMenu from '@/components/BurgerMenu'
import { Note } from '@/types/note'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Note[]>([])

  useEffect(() => {
    const searchNotes = async () => {
      if (searchTerm.length > 2) {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
        if (response.ok) {
          const data = await response.json()
          setSearchResults(data)
        }
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(searchNotes, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-100">
      <BurgerMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Notes</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-4">
          {searchResults.map((note) => (
            <Link href={`/note/${note.id}`} key={note.id}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                <p className="text-gray-600 mb-2">{note.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

