import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

// import notesInitialState from '../../data.json'

import { type NoteId, type NoteItem } from '../../types'

const DEFAULT_STATE = [
  {
    id: '1',
    text: '# New Note',
    tags: [
      'react', 'study', 'notes'
    ]
  }
]

const initialState: NoteItem[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState !== null) {
    return JSON.parse(persistedState).notes as NoteItem[]
  } else {
    return DEFAULT_STATE
  }
})()

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    editNote: (state, action: PayloadAction<NoteItem>) => {
      const { id, text, tags } = action.payload
      return state.map((existingNote) => {
        if (existingNote.id === id) {
          return { ...existingNote, text, tags }
        }
        console.log(existingNote.text)
        return existingNote
      })
    },
    deleteNote: (state, action: PayloadAction<NoteId>) => {
      const id = action.payload
      return state.filter((note) => note.id !== id)
    },
    createNote: (state, action: PayloadAction<NoteId>) => {
      const id = action.payload
      const note = { id, text: 'New Note', tags: [] }
      return [...state, note]
    }
  }
})

export const { editNote, deleteNote, createNote } = notesSlice.actions
export default notesSlice.reducer
