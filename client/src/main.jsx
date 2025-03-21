import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import store from './redux/store.js'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
  </Provider>
)
