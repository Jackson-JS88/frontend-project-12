import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getMessages, sendMessageHttp } from '../services/api'
import { 
  setChannels, setCurrentChannel, 
  createChannelAsync, renameChannelAsync, removeChannelAsync,
  setLoading as setChannelsLoading, setError as setChannelsError 
} from '../store/channelsSlice'
import { setMessages, addMessage, updateMessageStatus, removeTempMessage, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice'
import { useSocket } from '../hooks/useSocket'
import Navbar from './Navbar'
import ChannelMenu from './ChannelMenu'
import AddChannelModal from './AddChannelModal'
import RenameChannelModal from './RenameChannelModal'
import RemoveChannelModal from './RemoveChannelModal'


const ChatPage = () => {
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null)
  const [newMessageText, setNewMessageText] = useState('')
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState(null)

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
    
    const currentUsername = localStorage.getItem('username') || 'Вы'
    
    const tempMessage = {
      tempId,
      text: messageText,
      username: currentUsername,
      channelId: currentChannelId,
      sending: true,
    }
    
    dispatch(addMessage(tempMessage))
    dispatch(updateMessageStatus({ tempId, status: 'sending' }))

    try {
      await sendMessageHttp(currentChannelId, messageText)
      dispatch(updateMessageStatus({ tempId, status: 'sent' }))
    } catch {
      dispatch(updateMessageStatus({ tempId, status: 'error', error: 'Не удалось отправить' }))
      setTimeout(() => dispatch(removeTempMessage(tempId)), 5000)
    }
  }

  const handleAddChannel = async (name) => {
    await dispatch(createChannelAsync(name)).unwrap()
  }

  const handleRenameChannel = async (name) => {
    if (selectedChannel) {
      await dispatch(renameChannelAsync({ id: selectedChannel.id, name })).unwrap()
    }
  }

  const handleRemoveChannel = async () => {
    if (selectedChannel) {
      await dispatch(removeChannelAsync(selectedChannel.id)).unwrap()
    }
  }

  const openRenameModal = (channel) => {
    setSelectedChannel(channel)
    setShowRenameModal(true)
  }

  const openRemoveModal = (channel) => {
    setSelectedChannel(channel)
    setShowRemoveModal(true)
  }

  const closeModals = () => {
    setShowAddModal(false)
    setShowRenameModal(false)
    setShowRemoveModal(false)
    setSelectedChannel(null)
  }

  const getMessageStatus = (message) => {
    if (message.tempId) {
      const status = sendingStatus[message.tempId]?.status
      if (status === 'sending') {
        return <span className="ms-2 small text-muted">(отправляется...)</span>
      }
      if (status === 'error') {
        return <span className="ms-2 small text-danger">(ошибка)</span>
      }
    }
    return null
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
  const currentUsername = localStorage.getItem('username')

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      
      <AddChannelModal
        isOpen={showAddModal}
        onClose={closeModals}
        onAdd={handleAddChannel}
        existingChannels={channels}
      />

      <RenameChannelModal
        isOpen={showRenameModal}
        onClose={closeModals}
        onRename={handleRenameChannel}
        channel={selectedChannel}
        existingChannels={channels}
      />

      <RemoveChannelModal
        isOpen={showRemoveModal}
        onClose={closeModals}
        onRemove={handleRemoveChannel}
        channel={selectedChannel}
      />

      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-3 bg-light p-0 border-end" style={{ height: 'calc(100vh - 56px)' }}>
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Каналы</h5>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowAddModal(true)}
                  title="Добавить канал"
                >
                  +
                </button>
              </div>
              
              <div className="list-group">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      String(channel.id) === String(currentChannelId) ? 'active' : ''
                    }`}
                    onClick={() => dispatch(setCurrentChannel(String(channel.id)))}
                    style={{ cursor: 'pointer' }}
                  >
                    <span style={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '120px'
                    }}>
                      <span className="text-muted me-1">#</span>
                      {channel.name}
                    </span>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <ChannelMenu
                        channel={channel}
                        onRename={() => openRenameModal(channel)}
                        onRemove={() => openRemoveModal(channel)}
                        isActive={String(channel.id) === String(currentChannelId)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-9 p-0 d-flex flex-column" style={{ height: 'calc(100vh - 56px)' }}>
            {currentChannel ? (
              <>
                <div className="bg-light p-3 border-bottom">
                  <h5 className="mb-0">
                    <span className="text-muted me-1">#</span>
                    {currentChannel.name}
                  </h5>
                </div>

                <div className="flex-grow-1 p-3 overflow-auto" style={{ wordBreak: 'break-word' }}>
                  {channelMessages.length > 0 ? (
                    channelMessages.map((message) => {
                      const isOwn = message.username === currentUsername
                      
                      return (
                        <div key={message.id || message.tempId} className="mb-3">
                          <div style={{ 
                            color: isOwn ? '#0d6efd' : '#6c757d',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            marginBottom: '2px'
                          }}>
                            {message.username}
                          </div>
                          <div style={{
                            backgroundColor: isOwn ? '#e7f1ff' : '#f8f9fa',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            display: 'inline-block',
                            maxWidth: '70%'
                          }}>
                            <span style={{ whiteSpace: 'pre-wrap' }}>
                              {message.text}
                            </span>
                            {getMessageStatus(message)}
                          </div>
                        </div>
                      )
                    })
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
