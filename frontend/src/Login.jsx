import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (usuario === 'admin' && password === '1234') {
            onLogin()
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
                        placeholder="admin"
                    />
                </div>
                <div className="login-field">
                    <label className="login-label">Contraseña</label>
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="1234"
                    />
                </div>
                <button className="login-button" type="submit">Entrar</button>
            </form>
        </div>
    </div>
)
}
export default Login