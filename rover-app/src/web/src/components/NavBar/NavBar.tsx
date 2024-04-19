import { AppShell, Flex, ScrollArea, Title } from "@mantine/core";
import { AppMenu } from "./AppMenu";
import classes from "./NavBar.module.css";

export function NavBar() {
    return (
        <AppShell.Navbar className={classes.root}>
            <AppShell.Section className={classes.logoSection}>
                <Flex justify="center" align="center" p="sm" className={classes.logo}>
                    <Title order={1} fw="bolder">Rover</Title>
                </Flex>
            </AppShell.Section>
            <AppShell.Section grow my="xs" component={ScrollArea}>
                <AppMenu/>
            </AppShell.Section>
            <AppShell.Section className={classes.workspace}>
                <Flex justify="start" align="center" p="xs" w="100%" h={199}>
                    我的待办 todo
                </Flex>
            </AppShell.Section>
        </AppShell.Navbar>
    );
}