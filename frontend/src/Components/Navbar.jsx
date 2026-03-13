import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t } = useTranslation()
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
        <a className="navbar-brand" href="/">{t('appName')}</a>
        {showLogoutButton && (
          <button
            onClick={handleLogout}
            className="btn btn-primary"
            type="button"
          >
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
