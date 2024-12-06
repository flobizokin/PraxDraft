import { NextResponse } from 'next/server'
import { getAllNoteFiles, readNoteFile } from '@/utils/fileSystem'
import { searchNotes } from '@/utils/search'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  const files = await getAllNoteFiles()
  const notes = await Promise.all(
    files.map(async (file) => await readNoteFile(file))
  )

  const results = searchNotes(notes, query)
  return NextResponse.json(results)
}

