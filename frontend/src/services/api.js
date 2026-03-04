import axios from 'axios'


const api = axios.create({
  baseURL: '/api/v1',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password })
  return response.data
}

export const signup = async (username, password) => {
  const response = await api.post('/signup', { username, password })
  return response.data
}

export const getChannels = () => api.get('/channels')
export const getMessages = () => api.get('/messages')

export const sendMessageHttp = async (channelId, text) => {
  const response = await api.post('/messages', {
    channelId: String(channelId),
    text,
  })
  return response.data
}

export default api
