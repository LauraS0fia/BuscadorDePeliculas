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
    <div className="auth-shell auth-shell--login">
      <div className="auth-glow auth-glow--one" aria-hidden="true" />
      <div className="auth-glow auth-glow--two" aria-hidden="true" />

      <div className="auth-card fade-in glass-card">
        <aside className="auth-showcase">
          <p className="login-kicker">Buscador de películas</p>
          <h1 className="login-title">Cinematic</h1>
          <p className="auth-showcase-copy">
            Sigue tus películas favoritas, guarda tu selección y entra en segundos.
          </p>
          <ul className="auth-showcase-list">
            <li>Descubre estrenos destacados</li>
            <li>Guarda tus favoritas en un clic</li>
            <li>Navega en una interfaz rápida</li>
          </ul>
        </aside>

        <section className="auth-content">
          <p className="login-subtitle">Inicia sesión para continuar</p>

          {error && <p className="login-error">Usuario o contraseña incorrectos</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label" htmlFor="usuario">Usuario</label>
              <input
                id="usuario"
                className="login-input"
                type="text"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                placeholder="Tu usuario"
                autoComplete="username"
                required
              />
            </div>
            <div className="login-field">
              <label className="login-label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="login-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
              />
            </div>
            <button className="login-button" type="submit">Entrar</button>
          </form>

          <p className="login-link">
            ¿No tienes una cuenta?
            <button
              type="button"
              className="login-link-button"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </button>
          </p>
        </section>
      </div>
    </div>
  )
}
