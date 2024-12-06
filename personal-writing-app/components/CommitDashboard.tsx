'use client'

import { useState, useEffect } from 'react'
import { format, parseISO, eachDayOfInterval, subYears } from 'date-fns'
import Link from 'next/link'

interface CommitData {
  [date: string]: {
    count: number
    stacks: string[]
    noteIds: string[]
  }
}

export default function CommitDashboard() {
  const [commitData, setCommitData] = useState<CommitData>({})
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommitData = async () => {
      const response = await fetch('/api/commits')
      if (response.ok) {
        const data = await response.json()
        setCommitData(data)
      }
    }

    fetchCommitData()
  }, [])

  const today = new Date()
  const oneYearAgo = subYears(today, 1)
  const daysInYear = eachDayOfInterval({ start: oneYearAgo, end: today })

  const maxCommits = Math.max(...Object.values(commitData).map(data => data.count))

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Commit Activity</h2>
      <div className="grid grid-cols-53 gap-1 mb-4">
        {daysInYear.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd')
          const dayData = commitData[dayStr] || { count: 0, stacks: [], noteIds: [] }
          const intensity = dayData.count > 0 ? Math.max(20, (dayData.count / maxCommits) * 100) : 0
          return (
            <div
              key={dayStr}
              className="w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: `hsl(120, 100%, ${100 - intensity}%)` }}
              title={`${dayStr}: ${dayData.count} notes`}
              onClick={() => setSelectedDate(dayStr)}
            />
          )
        })}
      </div>
      {selectedDate && commitData[selectedDate] && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">{selectedDate}</h3>
          <p className="mb-2">{commitData[selectedDate].count} notes created</p>
          <p className="mb-2">Notebooks: {commitData[selectedDate].stacks.join(', ')}</p>
          <ul className="list-disc list-inside">
            {commitData[selectedDate].noteIds.map((noteId) => (
              <li key={noteId}>
                <Link href={`/note/${noteId}`} className="text-blue-500 hover:underline">
                  View Note
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

