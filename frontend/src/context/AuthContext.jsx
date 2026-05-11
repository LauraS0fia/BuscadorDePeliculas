import { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    return localStorage.getItem('estaLogueado') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('estaLogueado', String(estaLogueado))
  }, [estaLogueado])

  const handleLogin = () => {
    setEstaLogueado(true)
  }

  const handleLogout = () => {
    setEstaLogueado(false)
    localStorage.removeItem('estaLogueado')
  }

  return (
    <AuthContext.Provider value={{ estaLogueado, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
