import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShell } from "@mantine/core";
import { Header, NavBar } from "@/components";

const AppLayout = () => {

    return (
        <AppShell layout="alt" padding="0"
                  navbar={{
                      width: 240,
                      breakpoint: 'sm',
                  }}
                  header={{height: 60}}>
            <Header/>
            <NavBar/>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}

export const Route = createFileRoute('/_app')({
    component: AppLayout,
})
