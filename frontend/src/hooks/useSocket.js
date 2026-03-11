import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import socketService from '../sockets'
import { addMessage } from '../store/messagesSlice'
import { cleanText } from '../utils/profanityFilter'


export const useSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socketService.connect()

    const handleNewMessage = (message) => {
      const filteredMessage = {
        ...message,
        text: cleanText(message.text)
      }
      dispatch(addMessage(filteredMessage))
    }

    socketService.on('newMessage', handleNewMessage)

    return () => {
      socketService.off('newMessage', handleNewMessage)
    }
  }, [dispatch])

  return {}
}
