import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

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
