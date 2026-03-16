import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginApi, signup as signupApi } from '../services/api'

export const useAuth = () => {
  const navigate = useNavigate()

  const getToken = useCallback(() => {
    return localStorage.getItem('token')
  }, [])

  const getUsername = useCallback(() => {
    return localStorage.getItem('username')
  }, [])

  const login = useCallback(async (username, password) => {
    try {
      const response = await loginApi(username, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        navigate('/chat')
        return { success: true }
      }
    }
    catch (error) {
      return { success: false, error }
    }
  }, [navigate])

  const signup = useCallback(async (username, password) => {
    try {
      const response = await signupApi(username, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        navigate('/chat')
        return { success: true }
      }
    }
    catch (error) {
      return { success: false, error }
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }, [navigate])

  const isAuthenticated = useCallback(() => {
    return !!getToken()
  }, [getToken])

  return {
    token: getToken(),
    username: getUsername(),
    login,
    signup,
    logout,
    isAuthenticated: isAuthenticated(),
    getToken,
    getUsername,
  }
}
