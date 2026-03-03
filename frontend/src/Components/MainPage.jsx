import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const MainPage = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 text-center">
            <h1 className="mb-4">Hexlet Chat</h1>
            <p className="lead mb-4">Добро пожаловать в чат!</p>
            <p className="mb-4">Здесь скоро появится чат.</p>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
