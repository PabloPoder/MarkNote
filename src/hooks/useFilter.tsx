import { useState } from 'react'
import { type NoteItem as NoteItemType } from '../types'

export const useFilter = () => {
  const [filter, setFilter] = useState('all')

  const setTagFilter = (tag: string) => {
    setFilter(tag)
  }

  const filterNotes = (notes: NoteItemType[]) => {
    return notes.filter((note) => {
      return filter === 'all' || note.tags.includes(filter)
    })
  }

  return { filter, setTagFilter, filterNotes }
}
