import { useState } from 'react'
import styles from './StarRating.module.css'

function StarRating({ value = 0, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0)

  return (
    <div className={styles.stars} aria-label={`Nota: ${value} de 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.star} ${star <= (hover || value) ? styles.filled : ''}`}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          disabled={readOnly}
          aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
