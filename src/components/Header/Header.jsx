import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/estante', label: 'Estante' },
  { to: '/livros', label: 'Livros' },
  { to: '/relatorio', label: 'Relatório' },
]

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Lumus</Link>

      {user && (
        <nav className={styles.navLinks}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className={styles.nav}>
        {user ? (
          <>
            <span className={styles.username}>{user.name}</span>
            <button onClick={logout} className={styles.btn}>Sair</button>
          </>
        ) : (
          <Link to="/login" className={styles.btn}>Entrar</Link>
        )}
      </div>
    </header>
  )
}

export default Header
