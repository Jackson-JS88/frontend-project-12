import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  currentChannelId: null,
  loading: false,
  error: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setChannels, setCurrentChannel, setLoading, setError } = channelsSlice.actions
export default channelsSlice.reducer
