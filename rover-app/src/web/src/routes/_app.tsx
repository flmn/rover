import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Anchor, AppShell, ScrollArea, Title } from "@mantine/core";

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
            <AppShell.Navbar p="sm">
                <AppShell.Section>
                    <Title order={1} fw="bolder">Rover</Title>
                </AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <Anchor href="/">
                        Dashboard
                    </Anchor>
                    <br/>
                    <Anchor href="/fleet/aircrafts">
                        Fleet/Aircrafts
                    </Anchor>
                    <br/>
                    <Anchor href="/settings">
                        Settings
                    </Anchor>
                    <br/>
                    <Anchor href="/settings/users">
                        Settings/Users
                    </Anchor>
                    <br/>
                    <Anchor href="/settings/enums">
                        Settings/Enums
                    </Anchor>
                </AppShell.Section>
                <AppShell.Section h={60}>
                    <Anchor href="/login">
                        Login
                    </Anchor>
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
