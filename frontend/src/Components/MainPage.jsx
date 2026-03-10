import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'


const MainPage = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 text-center">
            <h1 className="mb-4">{t('appName')}</h1>
            <a href="/login" className="btn btn-primary">{t('login.title')}</a>
            <div className="mt-3">
              <span className="text-muted">{t('login.noAccount')} </span>
              <a href="/signup" className="text-decoration-none">{t('login.signup')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
