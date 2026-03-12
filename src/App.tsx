// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import WaveCrazeApp from './WaveCraze';  // or './App' depending on filename
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WaveCrazeApp />
  </React.StrictMode>
);