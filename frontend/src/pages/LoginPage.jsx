import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

export function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { handleLogin } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    // Obtener usuario y contraseña guardados
    const usuarioGuardado = localStorage.getItem('usuario')
    const passwordGuardado = localStorage.getItem('password')
    if (usuario === usuarioGuardado && password === passwordGuardado) {
      handleLogin()
      navigate('/movies')
    } else {
      setError(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <p className="login-kicker">Buscador de películas</p>
        <h1 className="login-title">Cinematic</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        {error && <p className="login-error">Usuario o contraseña incorrectos</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Usuario</label>
            <input
              className="login-input"
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Tu Usuario"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Tu Contraseña"
            />
          </div>
          <button className="login-button" type="submit">Entrar</button>
        </form>
        <p className="login-link">¿No tienes una cuenta? <a href="#" onClick={() => navigate('/register')}>Regístrate</a></p>
      </div>
    </div>
  )
}
