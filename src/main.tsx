import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { websiteInfo } from './data/website/info';
// Set the title dynamically
document.title = websiteInfo.name;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);