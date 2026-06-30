import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './BookCard.module.css'

function BookCard({ reading }) {
  const { id, Book, progress } = reading

  return (
    <Link to={`/livro/${id}`} className={styles.card}>
      <div className={styles.cover}>
        {Book.coverUrl ? (
          <img src={Book.coverUrl} alt={`Capa de ${Book.title}`} />
        ) : (
          <div className={styles.placeholder}>
            <span>{Book.title[0]}</span>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{Book.title}</h3>
        <p className={styles.author}>{Book.author}</p>
        <div className={styles.progress}>
          <ProgressBar value={progress} />
        </div>
      </div>
    </Link>
  )
}

export default BookCard
