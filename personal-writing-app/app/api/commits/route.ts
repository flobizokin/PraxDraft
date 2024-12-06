import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { format, parseISO } from 'date-fns'

const DATA_DIR = path.join(process.cwd(), 'data', 'notes')

export async function GET() {
  const files = await fs.readdir(DATA_DIR)
  const commitData = {}

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const noteData = JSON.parse(fileContent)

    const createdDate = format(parseISO(noteData.createdAt), 'yyyy-MM-dd')
    if (!commitData[createdDate]) {
      commitData[createdDate] = { count: 0, stacks: [], noteIds: [] }
    }
    commitData[createdDate].count++
    commitData[createdDate].stacks = [...new Set([...commitData[createdDate].stacks, ...noteData.stacks])]
    commitData[createdDate].noteIds.push(noteData.id)
  }

  return NextResponse.json(commitData)
}

