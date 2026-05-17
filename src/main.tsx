import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import '@smastrom/react-rating/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ProductProvider } from './context/ProductContext.tsx';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <ProductProvider>
          <App />
          </ProductProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
