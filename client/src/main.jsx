import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AppProvider } from './context/AppContext'
import {MotionConfig} from 'motion/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport ={{once: true}}>
        <App/>
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
