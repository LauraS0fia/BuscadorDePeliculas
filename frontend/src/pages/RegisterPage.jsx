import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export function RegisterPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!usuario || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    // Guardar usuario y contraseña en localStorage
    localStorage.setItem('usuario', usuario)
    localStorage.setItem('password', password)
    navigate('/login')
  }

  return (
    <div className="auth-shell auth-shell--register">
      <div className="auth-glow auth-glow--one" aria-hidden="true" />
      <div className="auth-glow auth-glow--two" aria-hidden="true" />

      <div className="auth-card fade-in glass-card">
        <aside className="auth-showcase">
          <p className="login-kicker">Buscador de películas</p>
          <h1 className="login-title">Cinematic</h1>
          <p className="auth-showcase-copy">
            Crea tu cuenta para personalizar tu experiencia y guardar tus películas preferidas.
          </p>
          <ul className="auth-showcase-list">
            <li>Acceso rápido a tus favoritos</li>
            <li>Interfaz pensada para explorar mejor</li>
            <li>Cuenta lista en menos de un minuto</li>
          </ul>
        </aside>

        <section className="auth-content">
          <p className="login-subtitle">Crea tu cuenta</p>

          {error && <p className="login-error">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label" htmlFor="register-usuario">Usuario</label>
              <input
                id="register-usuario"
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
              <label className="login-label" htmlFor="register-password">Contraseña</label>
              <input
                id="register-password"
                className="login-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="login-field">
              <label className="login-label" htmlFor="register-confirm-password">Confirmar contraseña</label>
              <input
                id="register-confirm-password"
                className="login-input"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
                required
              />
            </div>
            <button className="login-button" type="submit">Registrarse</button>
          </form>

          <p className="login-link">
            ¿Ya tienes una cuenta?
            <button
              type="button"
              className="login-link-button"
              onClick={() => navigate('/login')}
            >
              Inicia sesión
            </button>
          </p>
        </section>
      </div>
    </div>
  )
}
