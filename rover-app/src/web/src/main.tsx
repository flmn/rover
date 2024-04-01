import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { theme } from '@/theme';
import './index.css'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme} classNamesPrefix="mt">
                <ModalsProvider>
                    <RouterProvider router={router}/>
                </ModalsProvider>
            </MantineProvider>
            <ReactQueryDevtools position={'bottom'}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
