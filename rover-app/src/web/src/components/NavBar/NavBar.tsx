import { AppShell, Flex, ScrollArea, Title } from "@mantine/core";
import { IconCircleLetterR } from "@tabler/icons-react";
import { AppMenu } from "./AppMenu";
import classes from "./NavBar.module.css";

interface NavBarProps {
    collapsed: boolean;
}

export function NavBar(props: NavBarProps) {
    return (
        <AppShell.Navbar className={classes.root}>
            <AppShell.Section className={classes.logoSection}>
                <Flex justify="center" align="center" p="sm" gap="xs" className={classes.logo}>
                    <IconCircleLetterR size="2.4rem"/>
                    {!props.collapsed && <Title order={1} fw="bolder">Rover</Title>}
                </Flex>
            </AppShell.Section>
            <AppShell.Section grow my="xs" component={ScrollArea}>
                <AppMenu collapsed={props.collapsed}/>
            </AppShell.Section>
            <AppShell.Section className={classes.workspace}>
                <Flex justify="start" align="center" p="xs" w="100%" h={199}>
                    我的待办 todo
                </Flex>
            </AppShell.Section>
        </AppShell.Navbar>
    );
}