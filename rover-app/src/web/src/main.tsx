import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import { theme } from '@/theme';
import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} classNamesPrefix="mt">
            <RouterProvider router={router}/>
        </MantineProvider>
    </React.StrictMode>,
)
