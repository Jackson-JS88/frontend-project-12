import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getMessages } from '../services/api'
import { setChannels, setCurrentChannel, setLoading as setChannelsLoading, setError as setChannelsError } from '../store/channelsSlice'
import { setMessages, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice'
import Navbar from './Navbar'


const ChatPage = () => {
  const dispatch = useDispatch()
  const { channels, currentChannelId, loading: channelsLoading } = useSelector((state) => state.channels)
  const { messages, loading: messagesLoading } = useSelector((state) => state.messages)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setChannelsLoading(true))
        dispatch(setMessagesLoading(true))

        console.log('Загружаем данные...')
        
        const [channelsResponse, messagesResponse] = await Promise.all([
          getChannels(),
          getMessages(),
        ])

        console.log('Каналы получены:', channelsResponse.data)
        console.log('Сообщения получены:', messagesResponse.data)

        dispatch(setChannels(channelsResponse.data))
        dispatch(setMessages(messagesResponse.data))
        
        if (channelsResponse.data.length > 0) {
          dispatch(setCurrentChannel(String(channelsResponse.data[0].id)))
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
        dispatch(setChannelsError(error.message))
        dispatch(setMessagesError(error.message))
      } finally {
        dispatch(setChannelsLoading(false))
        dispatch(setMessagesLoading(false))
      }
    }

    fetchData()
  }, [dispatch])

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
                      <div key={message.id} className="mb-3">
                        <strong>{message.username}:</strong> {message.text}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted mt-5">
                      <p>Пока нет сообщений</p>
                      <p className="small">Будьте первым, кто напишет в этом канале!</p>
                    </div>
                  )}
                </div>

                <div className="p-3 border-top">
                  <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Введите сообщение..."
                    />
                    <button type="submit" className="btn btn-primary">
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
