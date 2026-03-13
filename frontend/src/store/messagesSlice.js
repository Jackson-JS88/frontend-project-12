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
      const newMessage = action.payload

      if (newMessage.id) {
        const tempMessageIndex = state.messages.findIndex(m =>
          m.tempId
          && m.text === newMessage.text
          && m.channelId === newMessage.channelId,
        )

        if (tempMessageIndex !== -1) {
          const tempId = state.messages[tempMessageIndex]?.tempId
          state.messages.splice(tempMessageIndex, 1)
          if (tempId) {
            delete state.sendingStatus[tempId]
          }
        }
      }

      state.messages.push(newMessage)
    },
    updateMessageStatus: (state, action) => {
      const { tempId, status, error } = action.payload
      if (tempId) {
        state.sendingStatus[tempId] = { status, error }

        const message = state.messages.find(m => m.tempId === tempId)
        if (message) {
          message.status = status
        }
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
  setError,
} = messagesSlice.actions

export default messagesSlice.reducer
