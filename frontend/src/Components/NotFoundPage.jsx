import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="text-center">
            <h1 className="display-1 mb-4">{t('notFound.title')}</h1>
            <p className="lead mb-4">{t('notFound.message')}</p>
            <a href="/" className="btn btn-primary">
              {t('notFound.backToHome')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
