import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShell } from "@mantine/core";
import { NavBar } from "@/components/NavBar";

const AppLayout = () => {

    return (
        <AppShell layout="alt" padding="0"
                  navbar={{
                      width: 240,
                      breakpoint: 'sm',
                  }}>
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
