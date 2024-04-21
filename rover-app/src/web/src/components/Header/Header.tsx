import { ActionIcon, Anchor, AppShell, Breadcrumbs, Flex, Group, Text } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ColorSchemeToggle } from "@/components";
import { Account } from "./Account";
import classes from "./Header.module.css";
import { splitPath } from "@/utils";
import { getMenuName } from "@/config";

interface HeaderProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

export function Header(props: HeaderProps) {
    const state = useRouterState({
        select: (state) => state.location,
    })

    const segments = splitPath(state.pathname);

    const breadcrumbs = segments.map((item, index) => {
        console.log(index, item)
        if (index === 0 && item === '/') {
            return <Anchor to="/" component={Link} key={index}>首页</Anchor>;
        } else {
            return <Text key={index}>{getMenuName(item)}</Text>;
        }
    })

    return (
        <AppShell.Header>
            <Flex justify="space-between" align="center" className={classes.root} w="100%">
                <Group gap="md" pl="xs">
                    <ActionIcon variant="subtle" color="gray" onClick={props.toggleCollapsed}>
                        {props.collapsed ? <IconLayoutSidebarRightCollapse size="2.4rem"/> :
                            <IconLayoutSidebarLeftCollapse size="2.4rem"/>}
                    </ActionIcon>
                    <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
                </Group>
                <Group gap="md" pr="md">
                    <ColorSchemeToggle/>
                    <Account/>
                </Group>
            </Flex>
        </AppShell.Header>
    );
}
