import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'notes')

export async function GET() {
  const files = await fs.readdir(DATA_DIR)
  const notes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(DATA_DIR, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(fileContent)
    })
  )
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const notes = await request.json()

  for (const note of notes) {
    const filePath = path.join(DATA_DIR, `${note.id}.json`)
    await fs.writeFile(filePath, JSON.stringify(note, null, 2))
  }

  return NextResponse.json({ message: 'Sync successful' })
}

