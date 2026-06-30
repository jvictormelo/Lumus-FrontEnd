import { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem('lumus_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUserFromStorage)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/users/login', { email, password })
      localStorage.setItem('lumus_user', JSON.stringify(data))
      setUser(data)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    const locale = navigator.language?.split('-'[0] ||'pt' )
    try {
      const { data } = await api.post('/users/register', { name, email, password, locale })
      localStorage.setItem('lumus_user', JSON.stringify(data))
      setUser(data)
      return data
    }catch(err){
      throw err
    } 
    finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/users/logout')
    } finally {
      localStorage.removeItem('lumus_user')
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
