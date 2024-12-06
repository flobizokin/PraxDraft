import { Note } from '@/types/note'

interface NoteVersion {
  id: string
  noteId: string
  content: string
  timestamp: string
}

class VersionControl {
  private versions: Map<string, NoteVersion[]> = new Map()

  createVersion(note: Note) {
    const version: NoteVersion = {
      id: Date.now().toString(),
      noteId: note.id,
      content: note.content,
      timestamp: new Date().toISOString()
    }

    if (!this.versions.has(note.id)) {
      this.versions.set(note.id, [])
    }

    this.versions.get(note.id)!.push(version)
  }

  getVersions(noteId: string): NoteVersion[] {
    return this.versions.get(noteId) || []
  }

  restoreVersion(noteId: string, versionId: string): Note | null {
    const versions = this.versions.get(noteId)
    if (!versions) return null

    const version = versions.find(v => v.id === versionId)
    if (!version) return null

    return {
      ...version,
      id: noteId,
      title: '', // You might want to store the title in versions as well
      createdAt: '',
      updatedAt: new Date().toISOString(),
      stacks: [],
      tags: [],
      links: [],
      attachments: []
    }
  }
}

export const versionControl = new VersionControl()

