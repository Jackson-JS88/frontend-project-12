import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import store from './store'
import I18nProvider from './Components/I18nProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nProvider>
      <App />
    </I18nProvider>
  </Provider>
)
