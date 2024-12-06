import { NextResponse } from 'next/server'
import { readNoteFile, writeNoteFile, getAllNoteFiles, deleteNoteFile } from '@/utils/fileSystem'
import { versionControl } from '@/utils/versionControl'
import { pluginManager } from '@/utils/pluginSystem'
import { Note } from '@/types/note'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const stack = searchParams.get('stack')

  if (id) {
    try {
      const note = await readNoteFile(`${id}.json`)
      return NextResponse.json(note)
    } catch (error) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }
  } else if (stack) {
    const files = await getAllNoteFiles()
    const notes = await Promise.all(
      files.map(async (file) => await readNoteFile(file))
    )
    const stackNotes = notes.filter(note => note.stacks.includes(stack))
    return NextResponse.json(stackNotes)
  } else {
    const files = await getAllNoteFiles()
    const notes = await Promise.all(
      files.map(async (file) => await readNoteFile(file))
    )
    return NextResponse.json(notes)
  }
}

export async function POST(request: Request) {
  const note: Note = await request.json()
  const fileName = `${note.id}.json`
  await writeNoteFile(fileName, note)
  versionControl.createVersion(note)
  pluginManager.getPlugin('ExamplePlugin')?.initialize(note)
  return NextResponse.json({ message: 'Note saved successfully', id: note.id })
}

export async function PUT(request: Request) {
  const note: Note = await request.json()
  const fileName = `${note.id}.json`
  await writeNoteFile(fileName, note)
  versionControl.createVersion(note)
  pluginManager.getPlugin('ExamplePlugin')?.initialize(note)
  return NextResponse.json({ message: 'Note updated successfully' })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id) {
    await deleteNoteFile(`${id}.json`)
    return NextResponse.json({ message: 'Note deleted successfully' })
  }
  return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
}

