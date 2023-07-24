export type NoteId = string

export interface NoteItem {
  id: NoteId
  text: string
  tags: string[]
}
