import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { MoviesPage } from './pages/MoviesPage'
//import './App.css'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/movies" 
        element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/movies" replace />} />
      <Route path="*" element={<Navigate to="/movies" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App