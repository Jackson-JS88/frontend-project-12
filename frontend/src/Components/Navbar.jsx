import { useNavigate, useLocation } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const isAuthenticated = !!localStorage.getItem('token')
  const showLogoutButton = isAuthenticated && location.pathname === '/chat'

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">My Chat</a>
        {showLogoutButton && (
          <button 
            onClick={handleLogout}
            className="btn btn-primary"
            type="button"
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
