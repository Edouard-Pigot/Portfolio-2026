import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App/App.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <App />
)
