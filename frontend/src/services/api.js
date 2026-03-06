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

export const sendMessageHttp = async (channelId, text, username) => {
  const response = await api.post('/messages', {
    channelId: String(channelId),
    text,
    username,
  })
  return response.data
}

export const createChannel = async (name) => {
  const response = await api.post('/channels', { name })
  return response.data
}

export const renameChannel = async (id, name) => {
  const response = await api.patch(`/channels/${id}`, { name })
  return response.data
}

export const removeChannel = async (id) => {
  const response = await api.delete(`/channels/${id}`)
  return response.data
}


export default api
