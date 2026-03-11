import { I18nextProvider } from 'react-i18next'
import { createI18n } from '../i18n'

const I18nProvider = ({ children }) => {
  const i18nInstance = createI18n()
  
  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  )
}

export default I18nProvider