import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getMessages, sendMessageHttp } from '../services/api'
import { setChannels, setCurrentChannel, setLoading as setChannelsLoading, setError as setChannelsError } from '../store/channelsSlice'
import { setMessages, addMessage, updateMessageStatus, removeTempMessage, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice'
import { useSocket } from '../hooks/useSocket'
import Navbar from './Navbar'


const ChatPage = () => {
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null)
  const [newMessageText, setNewMessageText] = useState('')
  
  const { channels, currentChannelId, loading: channelsLoading } = useSelector((state) => state.channels)
  const { messages, loading: messagesLoading, sendingStatus } = useSelector((state) => state.messages)

  useSocket()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setChannelsLoading(true))
        dispatch(setMessagesLoading(true))

        const [channelsResponse, messagesResponse] = await Promise.all([
          getChannels(),
          getMessages(),
        ])

        dispatch(setChannels(channelsResponse.data))
        dispatch(setMessages(messagesResponse.data))
        
        if (channelsResponse.data.length > 0) {
          dispatch(setCurrentChannel(String(channelsResponse.data[0].id)))
        }
      } catch (error) {
        dispatch(setChannelsError(error.message))
        dispatch(setMessagesError(error.message))
      } finally {
        dispatch(setChannelsLoading(false))
        dispatch(setMessagesLoading(false))
      }
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentChannelId])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessageText.trim() || !currentChannelId) return

    const tempId = `temp-${Date.now()}`
    const messageText = newMessageText.trim()
    setNewMessageText('')
    
    const tempMessage = {
      tempId,
      text: messageText,
      username: 'Вы',
      channelId: currentChannelId,
      sending: true,
    }
    
    dispatch(addMessage(tempMessage))
    dispatch(updateMessageStatus({ tempId, status: 'sending' }))

    try {
      await sendMessageHttp(currentChannelId, messageText)
      dispatch(updateMessageStatus({ tempId, status: 'sent' }))
    } catch {
      dispatch(updateMessageStatus({ 
        tempId, 
        status: 'error', 
        error: 'Не удалось отправить' 
      }))
      
      setTimeout(() => {
        dispatch(removeTempMessage(tempId))
      }, 5000)
    }
  }

  if (channelsLoading || messagesLoading) {
    return (
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    )
  }

  const currentChannel = channels.find(c => String(c.id) === String(currentChannelId))
  const channelMessages = messages.filter(m => String(m.channelId) === String(currentChannelId))

  const getMessageStatus = (message) => {
    if (message.tempId) {
      const status = sendingStatus[message.tempId]?.status
      if (status === 'sending') {
        return <span className="text-muted ms-2 small">⏳</span>
      }
      if (status === 'error') {
        return <span className="text-danger ms-2 small">❌</span>
      }
    }
    return null
  }

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-3 bg-light p-0 border-end" style={{ height: 'calc(100vh - 56px)' }}>
            <div className="p-3">
              <h5 className="mb-3">Каналы</h5>
              <div className="list-group">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`list-group-item list-group-item-action ${
                      String(channel.id) === String(currentChannelId) ? 'active' : ''
                    }`}
                    onClick={() => dispatch(setCurrentChannel(String(channel.id)))}
                  >
                    # {channel.name}
                    {!channel.removable && (
                      <span className="badge bg-secondary ms-2">fixed</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-9 p-0 d-flex flex-column" style={{ height: 'calc(100vh - 56px)' }}>
            {currentChannel ? (
              <>
                <div className="bg-light p-3 border-bottom">
                  <h5 className="mb-0"># {currentChannel.name}</h5>
                </div>

                <div className="flex-grow-1 p-3 overflow-auto">
                  {channelMessages.length > 0 ? (
                    channelMessages.map((message) => (
                      <div 
                        key={message.id || message.tempId} 
                        className={`mb-3 ${message.tempId ? 'opacity-75' : ''}`}
                      >
                        <strong>{message.username}:</strong> {message.text}
                        {getMessageStatus(message)}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted mt-5">
                      <p>Пока нет сообщений</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-top bg-white">
                  <form onSubmit={handleSendMessage} className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Введите сообщение..."
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      disabled={!currentChannelId}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!newMessageText.trim() || !currentChannelId}
                    >
                      Отправить
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-100 d-flex justify-content-center align-items-center">
                <p className="text-muted">Выберите канал</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
