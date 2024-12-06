import fs from 'fs/promises'
import path from 'path'
import { Note } from '@/types/note'

const DATA_DIR = path.join(process.cwd(), 'data', 'notes')

export async function readNoteFile(fileName: string): Promise<Note> {
  const filePath = path.join(DATA_DIR, fileName)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

export async function writeNoteFile(fileName: string, noteData: Note): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName)
  await fs.writeFile(filePath, JSON.stringify(noteData, null, 2))
}

export async function getAllNoteFiles(): Promise<string[]> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  return fs.readdir(DATA_DIR)
}

export async function deleteNoteFile(fileName: string): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName)
  await fs.unlink(filePath)
}

