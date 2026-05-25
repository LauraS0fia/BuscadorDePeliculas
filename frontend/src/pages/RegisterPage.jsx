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
    <div className="login-container">
      <div className="login-card">
        <p className="login-kicker">Buscador de películas</p>
        <h1 className="login-title">Cinematic</h1>
        <p className="login-subtitle">Crea tu cuenta</p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Usuario</label>
            <input
              className="login-input"
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Tu usuario"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Confirmar contraseña</label>
            <input
              className="login-input"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
            />
          </div>
          <button className="login-button" type="submit">Registrarse</button>
        </form>
        <p className="login-link">¿Ya tienes una cuenta? <a href="#" onClick={() => navigate('/login')}>Inicia sesión</a></p>
      </div>
    </div>
  )
}
