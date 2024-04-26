import { useAtom } from "jotai";
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AppShell } from "@mantine/core";
import { Header, NavBar } from "@/components";
import { collapsedAtom } from "@/store";

const AppLayout = () => {
    const [collapsed] = useAtom(collapsedAtom)

    return (
        <AppShell layout="alt" padding="0"
                  navbar={{
                      width: collapsed ? 60 : 240,
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
