import { NextResponse } from 'next/server'
import { versionControl } from '@/utils/versionControl'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const noteId = searchParams.get('noteId')
  
  if (!noteId) {
    return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
  }

  const versions = versionControl.getVersions(noteId)
  return NextResponse.json(versions)
}

export async function POST(request: Request) {
  const { noteId, versionId } = await request.json()
  
  if (!noteId || !versionId) {
    return NextResponse.json({ error: 'Note ID and Version ID are required' }, { status: 400 })
  }

  const restoredNote = versionControl.restoreVersion(noteId, versionId)
  if (!restoredNote) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  return NextResponse.json(restoredNote)
}

