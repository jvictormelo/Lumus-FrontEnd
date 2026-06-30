import { useState, useEffect } from 'react'
import api from '../../services/api'
import styles from './Relatorio.module.css'

function Relatorio() {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    api.get('/reading')
      .then(({ data }) => setReadings(data))
      .catch(() => setError('Não foi possível carregar os dados.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleExportPdf() {
    setDownloading(true)
    try {
      const { data } = await api.get('/reading/report/pdf', { responseType: 'blob' })
      const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'relatorio-lumus.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Erro ao gerar o PDF.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <p className={styles.info}>Carregando...</p>
  if (error) return <p className={styles.error}>{error}</p>

  const lidos = readings.filter((r) => r.status === 'lido')
  const lendo = readings.filter((r) => r.status === 'lendo')
  const querLer = readings.filter((r) => r.status === 'quero_ler')

  const totalPaginas = lidos.reduce((acc, r) => acc + (r.Book?.totalPages ?? 0), 0)
  const ratings = lidos.map((r) => r.rating).filter(Boolean)
  const mediaNotas = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : '–'

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1 className={styles.heading}>Relatório de Leitura</h1>
        <button
          className={styles.btnExport}
          onClick={handleExportPdf}
          disabled={downloading}
        >
          {downloading ? 'Gerando PDF...' : '⬇ Exportar PDF'}
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{lidos.length}</span>
          <span className={styles.statLabel}>Livros lidos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{lendo.length}</span>
          <span className={styles.statLabel}>Lendo agora</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{querLer.length}</span>
          <span className={styles.statLabel}>Quero ler</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalPaginas.toLocaleString('pt-BR')}</span>
          <span className={styles.statLabel}>Páginas lidas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{mediaNotas} ★</span>
          <span className={styles.statLabel}>Nota média</span>
        </div>
      </div>

      {lidos.length > 0 && (
        <section className={styles.section}>
          <h2>Livros concluídos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Páginas</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {lidos.map((r) => (
                <tr key={r.id}>
                  <td>{r.Book.title}</td>
                  <td>{r.Book.author}</td>
                  <td>{r.Book.totalPages}</td>
                  <td>{r.rating ? `${'★'.repeat(r.rating)}` : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {readings.length === 0 && (
        <p className={styles.empty}>Nenhuma leitura registrada ainda.</p>
      )}
    </div>
  )
}

export default Relatorio
