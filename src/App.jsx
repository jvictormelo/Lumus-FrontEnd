import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Estante from './pages/Estante/Estante'
import Livro from './pages/Livro/Livro'
import Livros from './pages/Livros/Livros'
import NovoLivro from './pages/NovoLivro/NovoLivro'
import Relatorio from './pages/Relatorio/Relatorio'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/estante" element={<Estante />} />
            <Route path="/livro/:id" element={<Livro />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/livros/novo" element={<NovoLivro />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
