import { Note } from '@/types/note'

export function searchNotes(notes: Note[], query: string): Note[] {
  const lowercaseQuery = query.toLowerCase()
  return notes.filter((note) => 
    note.title.toLowerCase().includes(lowercaseQuery) ||
    note.content.toLowerCase().includes(lowercaseQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    note.stacks.some(stack => stack.toLowerCase().includes(lowercaseQuery))
  )
}

