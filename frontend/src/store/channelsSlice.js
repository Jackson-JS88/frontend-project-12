import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createChannel, renameChannel, removeChannel } from '../services/api'

export const createChannelAsync = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const response = await createChannel(name)
    return response
  },
)

export const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const response = await renameChannel(id, name)
    return response
  },
)

export const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    await removeChannel(id)
    return id
  },
)

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
  extraReducers: (builder) => {
    builder
      .addCase(createChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        state.channels.push(action.payload)
        state.currentChannelId = String(action.payload.id)
      })
      .addCase(createChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(renameChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(renameChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        const index = state.channels.findIndex(c => c.id === action.payload.id)
        if (index !== -1) {
          state.channels[index] = action.payload
        }
      })
      .addCase(renameChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(removeChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        state.channels = state.channels.filter(c => c.id !== action.payload)
        if (state.currentChannelId === String(action.payload)) {
          state.currentChannelId = '1'
        }
      })
      .addCase(removeChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setChannels, setCurrentChannel, setLoading, setError } = channelsSlice.actions
export default channelsSlice.reducer
