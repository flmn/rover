import { Anchor, AppShell, Flex, ScrollArea, Title } from "@mantine/core";
import { Menu } from "@/components/Menu";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import classes from "./NavBar.module.css";

export function NavBar() {
    return (
        <AppShell.Navbar className={classes.root}>
            <AppShell.Section>
                <Flex justify="center" align="center" p="md" w="100%" h={68}>
                    <Title order={1} fw="bolder">Rover</Title>
                </Flex>
            </AppShell.Section>
            <AppShell.Section grow my="md" component={ScrollArea}>
                <Menu/>
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
    );
}