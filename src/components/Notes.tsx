import classes from './Notes.module.css'

import { NoteItem } from './NoteItem.tsx'
import { useAppSelector } from '../hooks/store.ts'
import { useNotes } from '../hooks/useNotes.ts'
import { useNavigate } from 'react-router-dom'

export function Notes () {
  const notes = useAppSelector((state) => state.notes)
  const navigate = useNavigate()

  const { getTitle, addNewNote } = useNotes()

  const handleNewNote = () => {
    const idToNavigate = addNewNote()
    navigate(idToNavigate)
  }

  return (
    <section className={classes.noteList}>
      <button type='button' onClick={handleNewNote}>📝 Create new Note</button>
      <div className={ classes.container}>
        {notes.map((note) =>
          <li key={note.id}>
            <NoteItem
              id={note.id}
              text={getTitle(note.text)}
              tags={note.tags}
            />
          </li>
        )}
      </div>
    </section>
  )
}
