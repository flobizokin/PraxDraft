export interface Attachment {
  name: string
  type: string
  url: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  stacks: string[]
  links: string[]
  attachments: Attachment[]
}

