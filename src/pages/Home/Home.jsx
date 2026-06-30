import { useAuth } from '../../context/AuthContext'
import styles from './Home.module.css'

function Home() {
  const { user } = useAuth()

  return (
    <div className={styles.container}>
      <h1>Bem-vindo{user ? `, ${user.name}` : ''}!</h1>
      <p>Esta é a página inicial do Lumus.</p>
    </div>
  )
}

export default Home
