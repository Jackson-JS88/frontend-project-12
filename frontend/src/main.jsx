import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import store from './store'
import './i18n'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
