'use client'

import React, { useState, useEffect } from 'react'
import { NoteVersion } from '@/types/note'

interface VersionHistoryProps {
  noteId: string
  onVersionRestore: (version: NoteVersion) => void
}

export default function VersionHistory({ noteId, onVersionRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<NoteVersion[]>([])

  useEffect(() => {
    const fetchVersions = async () => {
      const response = await fetch(`/api/versions?noteId=${noteId}`)
      if (response.ok) {
        const data = await response.json()
        setVersions(data)
      }
    }
    fetchVersions()
  }, [noteId])

  const handleRestore = async (versionId: string) => {
    const response = await fetch('/api/versions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId, versionId }),
    })
    if (response.ok) {
      const restoredNote = await response.json()
      onVersionRestore(restoredNote)
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Version History</h3>
      <ul className="space-y-2">
        {versions.map((version) => (
          <li key={version.id} className="flex justify-between items-center">
            <span>{new Date(version.timestamp).toLocaleString()}</span>
            <button
              onClick={() => handleRestore(version.id)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

