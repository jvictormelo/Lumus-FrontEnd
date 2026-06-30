import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import styles from './Livros.module.css'

function Livros() {
  const [books, setBooks] = useState([])
  const [myReadingIds, setMyReadingIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([api.get('/books'), api.get('/reading')])
      .then(([booksRes, readingRes]) => {
        setBooks(booksRes.data)
        setMyReadingIds(new Set(readingRes.data.map((r) => r.bookId)))
      })
      .catch(() => setError('Erro ao carregar livros.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(bookId) {
    setAdding(bookId)
    try {
      await api.post('/reading', { bookId, status: 'quero_ler' })
      setMyReadingIds((prev) => new Set([...prev, bookId]))
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao adicionar à estante.')
    } finally {
      setAdding(null)
    }
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1 className={styles.heading}>Livros</h1>
        <Link to="/livros/novo" className={styles.btnPrimary}>+ Novo livro</Link>
      </div>

      <input
        className={styles.search}
        type="text"
        placeholder="Buscar por título ou autor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className={styles.info}>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className={styles.empty}>Nenhum livro encontrado.</p>
      )}

      <div className={styles.grid}>
        {filtered.map((book) => {
          const inShelf = myReadingIds.has(book.id)
          return (
            <div key={book.id} className={styles.card}>
              <div className={styles.cover}>
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={`Capa de ${book.title}`} />
                ) : (
                  <div className={styles.placeholder}>
                    <span>{book.title[0]}</span>
                  </div>
                )}
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
                {book.genre && <p className={styles.genre}>{book.genre}</p>}
                <p className={styles.pages}>{book.totalPages} páginas</p>
              </div>
              <button
                className={`${styles.btnAdd} ${inShelf ? styles.btnAdded : ''}`}
                onClick={() => !inShelf && handleAdd(book.id)}
                disabled={inShelf || adding === book.id}
              >
                {adding === book.id ? '...' : inShelf ? 'Na estante ✓' : 'Adicionar'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Livros
