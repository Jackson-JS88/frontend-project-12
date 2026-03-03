import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './Components/MainPage'
import LoginPage from './Components/LoginPage'
import SignupPage from './Components/SignupPage'
import ChatPage from './Components/ChatPage'
import NotFoundPage from './Components/NotFoundPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
