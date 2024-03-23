import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme} classNamesPrefix="mt">
                <RouterProvider router={router}/>
            </MantineProvider>
            <ReactQueryDevtools position={'bottom'}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
