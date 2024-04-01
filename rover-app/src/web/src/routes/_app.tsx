import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Anchor, AppShell, Flex, ScrollArea, Title } from "@mantine/core";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { NavBar } from "@/components/NavBar";

const AppLayout = () => {

    return (
        <AppShell
            layout="alt"
            navbar={{
                width: 240,
                breakpoint: 'sm',
            }}
            padding="0"
        >
            <AppShell.Navbar>
                <AppShell.Section>
                    <Flex justify="center" align="center" p="md" w="100%" h={68}>
                        <Title order={1} fw="bolder">Rover</Title>
                    </Flex>
                </AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <NavBar/>
                </AppShell.Section>
                <AppShell.Section>
                    <Anchor href="/">
                        我的待办
                    </Anchor>
                </AppShell.Section>
                <AppShell.Section h={60}>
                    <Anchor href="/login">
                        注销
                    </Anchor>
                    <ColorSchemeToggle/>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}

export const Route = createFileRoute('/_app')({
    component: AppLayout,
})
