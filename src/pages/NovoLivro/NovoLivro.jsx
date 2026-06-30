import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './NovoLivro.module.css'

const INITIAL = { title: '', author: '', totalPages: '', genre: '', coverUrl: '' }

function NovoLivro() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/books', {
        ...form,
        totalPages: Number(form.totalPages),
      })
      navigate('/livros')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar livro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Novo Livro</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          Título *
          <input
            className={styles.input}
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Autor *
          <input
            className={styles.input}
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Total de páginas *
          <input
            className={styles.input}
            name="totalPages"
            type="number"
            min={1}
            value={form.totalPages}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Gênero
          <input
            className={styles.input}
            name="genre"
            value={form.genre}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          URL da capa
          <input
            className={styles.input}
            name="coverUrl"
            type="url"
            value={form.coverUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        {form.coverUrl && (
          <div className={styles.preview}>
            <img src={form.coverUrl} alt="Preview da capa" />
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate('/livros')}
          >
            Cancelar
          </button>
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Cadastrar livro'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NovoLivro
