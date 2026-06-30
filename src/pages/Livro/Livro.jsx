import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import StarRating from '../../components/StarRating/StarRating'
import api from '../../services/api'
import styles from './Livro.module.css'

function Livro() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [reading, setReading] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [currentPage, setCurrentPage] = useState('')
  const [savingPage, setSavingPage] = useState(false)
  const [pageMsg, setPageMsg] = useState('')

  const [rating, setRating] = useState(0)
  const [opinion, setOpinion] = useState('')
  const [savingRate, setSavingRate] = useState(false)
  const [rateMsg, setRateMsg] = useState('')

  useEffect(() => {
    api.get('/reading')
      .then(({ data }) => {
        const found = data.find((r) => String(r.id) === id)
        if (!found) { setError('Leitura não encontrada.'); return }
        setReading(found)
        setCurrentPage(found.currentPage ?? 0)
        setRating(found.rating ?? 0)
        setOpinion(found.opinion ?? '')
      })
      .catch(() => setError('Não foi possível carregar os dados.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdatePage(e) {
    e.preventDefault()
    setSavingPage(true)
    setPageMsg('')
    try {
      const { data } = await api.patch(`/reading/${id}/progress`, {
        currentPage: Number(currentPage),
      })
      setReading((prev) => ({ ...prev, ...data, progress: Math.min(Math.round((Number(currentPage) / prev.Book.totalPages) * 100), 100) }))
      setPageMsg('Progresso salvo!')
    } catch {
      setPageMsg('Erro ao salvar progresso.')
    } finally {
      setSavingPage(false)
    }
  }

  async function handleRate(e) {
    e.preventDefault()
    setSavingRate(true)
    setRateMsg('')
    try {
      await api.patch(`/reading/${id}/rate`, { rating, opinion })
      setRateMsg('Avaliação salva!')
    } catch {
      setRateMsg('Erro ao salvar avaliação.')
    } finally {
      setSavingRate(false)
    }
  }

  if (loading) return <p className={styles.info}>Carregando...</p>
  if (error) return <p className={styles.error}>{error}</p>

  const { Book, progress, pace, status } = reading

  const estimatedFinish = pace?.estimatedFinish
    ? new Date(pace.estimatedFinish).toLocaleDateString('pt-BR')
    : null

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Voltar</button>

      <div className={styles.hero}>
        <div className={styles.cover}>
          {Book.coverUrl ? (
            <img src={Book.coverUrl} alt={`Capa de ${Book.title}`} />
          ) : (
            <div className={styles.placeholder}>
              <span>{Book.title[0]}</span>
            </div>
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{Book.title}</h1>
          <p className={styles.author}>{Book.author}</p>
          {Book.genre && <p className={styles.genre}>{Book.genre}</p>}

          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span>Progresso</span>
              <span>{reading.currentPage} / {Book.totalPages} páginas</span>
            </div>
            <ProgressBar value={progress} />
          </div>

          {pace?.pagesPerDay > 0 && (
            <div className={styles.pace}>
              <span>Ritmo: <strong>{pace.pagesPerDay} pág/dia</strong></span>
              {estimatedFinish && (
                <span>Conclusão estimada: <strong>{estimatedFinish}</strong></span>
              )}
            </div>
          )}
        </div>
      </div>

      {status !== 'lido' && (
        <section className={styles.section}>
          <h2>Atualizar progresso</h2>
          <form className={styles.pageForm} onSubmit={handleUpdatePage}>
            <input
              className={styles.input}
              type="number"
              min={0}
              max={Book.totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              placeholder="Página atual"
              required
            />
            <button className={styles.btn} type="submit" disabled={savingPage}>
              {savingPage ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
          {pageMsg && <p className={styles.msg}>{pageMsg}</p>}
        </section>
      )}

      {status === 'lido' && (
        <section className={styles.section}>
          <h2>Sua avaliação</h2>
          <form className={styles.rateForm} onSubmit={handleRate}>
            <label className={styles.label}>Nota</label>
            <StarRating value={rating} onChange={setRating} />

            <label className={styles.label} style={{ marginTop: '1rem' }}>Opinião</label>
            <textarea
              className={styles.textarea}
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              rows={4}
              placeholder="Escreva sua opinião sobre o livro..."
            />

            <button className={styles.btn} type="submit" disabled={savingRate}>
              {savingRate ? 'Salvando...' : 'Salvar avaliação'}
            </button>
          </form>
          {rateMsg && <p className={styles.msg}>{rateMsg}</p>}
        </section>
      )}
    </div>
  )
}

export default Livro
