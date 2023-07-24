import classes from './NoteDetail.module.css'

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'
import ReactMarkdown from 'react-markdown'
import { type ChangeEvent, useState, useEffect } from 'react'
import { EditableTags } from './EditableTags'

export const NoteDetail = () => {
  const navigate = useNavigate()

  const { noteId } = useParams()

  const {
    getNoteById,
    updateNote,
    removeNote
  } = useNotes()

  // Local State
  const [note, setNote] = useState(() => getNoteById(noteId as string))
  const [viewMode, setViewMode] = useState(true)

  useEffect(() => {
    setNote(note)
  }, [note])

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setNote({ ...note, text: value })
  }

  const handleTagsChange = (newTags: string[]) => {
    setNote({ ...note, tags: newTags })
  }

  const handleDeleteNote = () => {
    removeNote(note.id)
    navigate('/')
  }

  return (
    <>
      <Link to="/">👈🏻 Go back</Link>
      <div className={classes.header}>
        <div className={classes.headerButtons}>
          <button aria-label="raw" onClick={() => { setViewMode(true) }}>
            ⌨️
          </button>
          /
          <button aria-label="preview" onClick={() => { setViewMode(false) }}>
            👀
          </button>
        </div>
        <div className={classes.tags}>
          <EditableTags tags={note.tags} onTagsChange={handleTagsChange} />
        </div>
      </div>

      {
        viewMode
          ? <textarea name="raw" value={note.text} onChange={handleTextChange} rows={30}></textarea>
          : <div className={classes.markdownText}>
            <ReactMarkdown>{note.text}</ReactMarkdown>
          </div>
      }
      <section className={classes.buttons}>
        <button onClick={handleDeleteNote}>🗑️ Delete</button>
        <button type="button" onClick={() => { updateNote(note) }}>📦 Save</button>
      </section>
    </>
  )
}
