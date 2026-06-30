import { useState, useEffect } from 'react'
import BookCard from '../../components/BookCard/BookCard'
import api from '../../services/api'
import styles from './Estante.module.css'

const TABS = [
  { key: 'lendo', label: 'Lendo' },
  { key: 'quero_ler', label: 'Quero Ler' },
  { key: 'lido', label: 'Lidos' },
]

function Estante() {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('lendo')

  useEffect(() => {
    api.get('/reading')
      .then(({ data }) => setReadings(data))
      .catch(() => setError('Não foi possível carregar sua estante.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = readings.filter((r) => r.status === tab)

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Minha Estante</h1>

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.active : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <span className={styles.badge}>
              {readings.filter((r) => r.status === t.key).length}
            </span>
          </button>
        ))}
      </div>

      {loading && <p className={styles.info}>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className={styles.empty}>Nenhum livro nesta lista ainda.</p>
      )}

      <div className={styles.grid}>
        {filtered.map((reading) => (
          <BookCard key={reading.id} reading={reading} />
        ))}
      </div>
    </div>
  )
}

export default Estante
