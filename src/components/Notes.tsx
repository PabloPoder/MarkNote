import classes from './Notes.module.css'

// import { useAppSelector } from '../hooks/store.ts'
import { useNotes } from '../hooks/useNotes.ts'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../hooks/useFilter.tsx'
import { NoteItem } from './NoteItem.tsx'

export function Notes () {
  const navigate = useNavigate()

  const {
    notes,
    getTitle,
    getTags,
    addNewNote
  } = useNotes()

  const { setTagFilter, filterNotes } = useFilter()

  const handleNewNote = () => {
    const idToNavigate = addNewNote()
    navigate(idToNavigate)
  }

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagFilter(event.target.value)
  }

  const filteredNotes = filterNotes(notes)

  return (
    <section className={classes.noteList}>
      <section className={classes.actions}>
        <div>
          <button type='button' onClick={handleNewNote}>📝 Create new Note</button>
          <select name="tags" id="tags-filter" onChange={handleChangeCategory}>
            <option value="all">🧭 All</option>
            {getTags().map((tag) => <option key={tag} value={tag}>🏷️ {tag}</option>)}
          </select>
        </div>
      </section>
      <div className={ classes.container}>
        {filteredNotes.map((note) =>
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
