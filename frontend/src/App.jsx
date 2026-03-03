import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './Components/MainPage'
import LoginPage from './Components/LoginPage'
import SignupPage from './Components/SignupPage'
import NotFoundPage from './Components/NotFoundPage'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  const token = localStorage.getItem('token')
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          } 
        /> 
        <Route 
          path="/login" 
          element={
            token ? <Navigate to="/" replace /> : <LoginPage />
          } 
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
