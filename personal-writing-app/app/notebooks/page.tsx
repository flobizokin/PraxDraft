'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BurgerMenu from '@/components/BurgerMenu'

interface Notebook {
  name: string
  noteCount: number
}

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchNotebooks = async () => {
      const response = await fetch('/api/stacks')
      if (response.ok) {
        const data = await response.json()
        setNotebooks(data)
      }
    }

    fetchNotebooks()
  }, [])

  const filteredNotebooks = notebooks.filter(notebook =>
    notebook.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <BurgerMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Notebooks</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notebooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotebooks.map((notebook) => (
            <Link href={`/notebooks/${notebook.name}`} key={notebook.name}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{notebook.name}</h2>
                <p className="text-gray-600">{notebook.noteCount} notes</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

