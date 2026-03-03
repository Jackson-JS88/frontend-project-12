import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
})

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password })
  return response.data
}

export default api
