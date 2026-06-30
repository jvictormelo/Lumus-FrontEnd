import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true, // envia o cookie de sessão automaticamente
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': navigator.language?.split('-')[0] || 'pt',
  },
})

// Redireciona para login em caso de 401, mas não quando já estamos em rotas de auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname
      if (path !== '/login' && path !== '/register') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
