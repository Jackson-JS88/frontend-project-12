import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from './Components/MainPage'
import LoginPage from './Components/LoginPage'
import SignupPage from './Components/SignupPage'
import ChatPage from './Components/ChatPage'
import NotFoundPage from './Components/NotFoundPage'


const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const FallbackUI = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Что-то пошло не так</h2>
    <p>Мы уже знаем об ошибке и работаем над её исправлением.</p>
    <a href="/" className="btn btn-primary">Вернуться на главную</a>
  </div>
)

function App() {

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary fallbackUI={FallbackUI}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
