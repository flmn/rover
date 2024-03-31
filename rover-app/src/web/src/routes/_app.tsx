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
                <AppShell.Section h={60}>
                    <Title order={1} fw="bolder">Rover 漫游者</Title>
                </AppShell.Section>
                <AppShell.Section>
                    <Anchor href="/">
                        我的待办
                    </Anchor>
                </AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <Anchor href="/">
                        首页
                    </Anchor>
                    <br/>
                    <Anchor href="/fleet/aircrafts">
                        机队管理
                    </Anchor>
                    <br/>
                    <Anchor href="/settings">
                        设置
                    </Anchor>
                    <br/>
                    <Anchor href="/settings/users">
                        用户管理
                    </Anchor>
                    <br/>
                    <Anchor href="/settings/enums">
                        数据字典管理
                    </Anchor>
                </AppShell.Section>
                <AppShell.Section h={60}>
                    <Anchor href="/login">
                        注销
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
