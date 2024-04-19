import { ActionIcon, AppShell, Breadcrumbs, Flex, Group, Text } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";
import { useRouterState } from "@tanstack/react-router";
import { ColorSchemeToggle } from "@/components";
import { Account } from "./Account";
import classes from "./Header.module.css";

export function Header() {
    const state = useRouterState({
        select: (state) => state.location,
    })

    const segments = state.pathname.split('/')

    const items = segments.map((item, index) => {
        if (index === 0 && item === '') {
            return (<Text key={index}>首页</Text>);
        } else {
            return (<Text key={index}>{item}</Text>);
        }
    })

    return (
        <AppShell.Header>
            <Flex justify="space-between" align="center" className={classes.root} w="100%">
                <Group gap="md" pl="xs">
                    <ActionIcon variant="subtle" color="gray">
                        <IconLayoutSidebarLeftCollapse size="2.4rem"/>
                    </ActionIcon>
                    <Breadcrumbs>{items}</Breadcrumbs>
                </Group>
                <Group gap="md" pr="md">
                    <ColorSchemeToggle/>
                    <Account/>
                </Group>
            </Flex>
        </AppShell.Header>
    );
}
