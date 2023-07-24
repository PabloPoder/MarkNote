import { type NoteItem as NoteItemType } from '../types'

import classes from './NoteItem.module.css'
import { Link } from 'react-router-dom'

export const NoteItem: React.FC<NoteItemType> = ({ id, text, tags }) => {
  return (
    <div className={classes.card}>
      <Link to={id}>
        <h2>{text}</h2>
      </Link>
      <section className={classes.tags}>
        {tags.map((tag) =>
          <p key={tag}>
            #{ tag }
          </p>
        )}
      </section>
    </div>
  )
}
