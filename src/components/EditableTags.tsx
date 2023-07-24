import classes from './NoteDetail.module.css'

import React, { useState, type FC } from 'react'

interface Props {
  tags: string[]
  onTagsChange: (newTags: string[]) => void
}

export const EditableTags: FC<Props> = ({ tags, onTagsChange }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedTags, setEditedTags] = useState(tags.join(','))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTags(event.target.value)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleSaveClick = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const newTags = editedTags.split(',').map(tag => tag.trim())
    onTagsChange(newTags)
    setEditMode(false)
  }

  return (
    <div className={classes.editTags}>
      {editMode
        ? <form onSubmit={handleSaveClick}>
          <input
            type="text"
            value={editedTags}
            onChange={handleInputChange}
            placeholder='study, music, movies'
          />
          <button type="submit" className={classes.tagButtons}>📦 Save</button>
        </form>
        : <>
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
          <button className={classes.tagButtons}
            onClick={handleEditClick}>✏️ Edit</button>
        </>
      }
    </div>
  )
}
