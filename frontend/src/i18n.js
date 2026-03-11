import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru'
import en from './locales/en'


export const createI18n = () => {
  const instance = i18n.createInstance()
  
  instance
    .use(initReactI18next)
    .init({
      resources: {
        ru,
        en,
      },
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })
  
  return instance
}

const defaultInstance = createI18n()
export default defaultInstance