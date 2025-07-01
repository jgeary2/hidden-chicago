import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/appStyles.scss';
import './styles/controlPanelStyles.scss';
import './styles/mapStyles.scss';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
