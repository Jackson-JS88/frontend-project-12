import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  messages: [],
  loading: false,
  error: null,
  sendingStatus: {},
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    updateMessageStatus: (state, action) => {
      const { tempId, status, error } = action.payload
      if (tempId) {
        state.sendingStatus[tempId] = { status, error }
      }
    },
    removeTempMessage: (state, action) => {
      state.messages = state.messages.filter(m => m.tempId !== action.payload)
      delete state.sendingStatus[action.payload]
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { 
  setMessages, 
  addMessage, 
  updateMessageStatus, 
  removeTempMessage,
  setLoading, 
  setError 
} = messagesSlice.actions

export default messagesSlice.reducer
