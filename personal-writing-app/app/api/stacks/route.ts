import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'notes')

export async function GET() {
  const files = await fs.readdir(DATA_DIR)
  const stacks = new Map()

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const noteData = JSON.parse(fileContent)

    for (const stack of noteData.stacks) {
      if (!stacks.has(stack)) {
        stacks.set(stack, { name: stack, noteCount: 0 })
      }
      stacks.get(stack).noteCount++
    }
  }

  return NextResponse.json(Array.from(stacks.values()))
}

