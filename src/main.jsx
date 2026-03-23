/**
 * @file main.jsx
 * @description Entry point of the React application. 
 * Initializes the React root and wraps the app with BrowserRouter for client-side routing.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
)