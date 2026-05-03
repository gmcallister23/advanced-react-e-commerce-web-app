import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import '@smastrom/react-rating/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
