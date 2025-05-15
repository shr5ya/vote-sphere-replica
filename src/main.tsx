
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Custom event for theme change
window.addEventListener('storage', (event) => {
  if (event.key === 'electra-theme') {
    document.documentElement.classList.toggle('dark', 
      event.newValue === 'dark' || 
      (!event.newValue && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }
});

// Initialize theme
const theme = localStorage.getItem('electra-theme');
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
