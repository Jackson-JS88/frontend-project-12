import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import socketService from '../sockets'
import { addMessage } from '../store/messagesSlice'


export const useSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socketService.connect()

    const handleNewMessage = (message) => {
      dispatch(addMessage(message))
    }

    socketService.on('newMessage', handleNewMessage)

    return () => {
      socketService.off('newMessage', handleNewMessage)
    }
  }, [dispatch])

  return {}
}
