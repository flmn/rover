import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import { theme } from '@/theme';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} classNamesPrefix="mt">
            <App/>
        </MantineProvider>
    </React.StrictMode>,
)
