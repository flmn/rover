import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header, NavBar } from "@/components";

const AppLayout = () => {
    const [collapsed, handlers] = useDisclosure(false);

    return (
        <AppShell layout="alt" padding="0"
                  navbar={{
                      width: collapsed ? 60 : 240,
                      breakpoint: 'sm',
                  }}
                  header={{height: 60}}>
            <Header collapsed={collapsed} toggleCollapsed={handlers.toggle}/>
            <NavBar collapsed={collapsed}/>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}

export const Route = createFileRoute('/_app')({
    component: AppLayout,
})
