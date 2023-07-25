import { type NoteId, type NoteItem as NoteItemType } from '../types'
import { useAppSelector, useAppDispatch } from './store'

import { editNote, deleteNote, createNote } from '../store/notes/slice'

export const useNotes = () => {
  const notes = useAppSelector((state) => state.notes)
  const dispatch = useAppDispatch()

  const getNoteById = (id: string) => {
    const note = notes.find((note) => note.id === id)
    if (note == null) {
      throw new Error(`Note with id ${id} not found`)
    }
    return note
  }

  const getTitle = (text: string) => {
    const titleNoSymbols = text.replace(/[^a-zA-Z]+/g, ' ')
    const wordsArray = titleNoSymbols.split(' ')
    const firstFiveWords = wordsArray.slice(0, 10)
    return firstFiveWords.join(' ') + '...'
  }

  // Actions
  const updateNote = ({ id, text, tags }: NoteItemType) => {
    dispatch(editNote({ id, text, tags }))
  }

  const removeNote = (id: NoteId) => {
    dispatch(deleteNote(id))
  }

  const addNewNote = () => {
    // Surge -> crypto.uuid doesn't work
    const timestamp = new Date().getTime().toString(16)
    const random = Math.random().toString(16).substring(2)

    const newNoteId = `${timestamp}-${random}`

    dispatch(createNote(newNoteId))
    return newNoteId
  }

  const getTags = () => {
    const listOfTags: string[] = []
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        if (listOfTags.includes(tag)) return
        listOfTags.push(tag)
      })
    })
    return listOfTags
  }

  return { notes, getNoteById, getTitle, updateNote, removeNote, addNewNote, getTags }
}
