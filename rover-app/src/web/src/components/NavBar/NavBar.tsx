import { ActionIcon, Anchor, AppShell, Flex, Group, Menu, ScrollArea, Title } from "@mantine/core";
import { IconLogout, IconMenu2, IconUserCircle } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { ColorSchemeToggle } from "@/components";
import { AppMenu } from "./AppMenu";
import { Profile } from "./Profile";
import classes from "./NavBar.module.css";

export function NavBar() {
    return (
        <AppShell.Navbar className={classes.root}>
            <AppShell.Section className={classes.logo}>
                <Flex justify="center" align="center" p="sm" w="100%" h={67}>
                    <Title order={1} fw="bolder">Rover</Title>
                </Flex>
            </AppShell.Section>
            <AppShell.Section grow my="md" component={ScrollArea}>
                <AppMenu/>
            </AppShell.Section>
            <AppShell.Section className={classes.workspace}>
                <Flex justify="start" align="center" p="sm" w="100%" h={59}>
                    <Anchor href="/">
                        我的待办
                    </Anchor>
                </Flex>
            </AppShell.Section>
            <AppShell.Section className={classes.profile}>
                <Flex justify="space-between" align="center" p="sm" w="100%" h={59}>
                    <Profile/>
                    <Group gap={2}>
                        <Menu position="top-start" shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconMenu2 size="1.3rem"/>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconUserCircle size="1.2rem"/>}
                                           to="/user/profile" component={Link}>
                                    个人资料
                                </Menu.Item>
                                <Menu.Item leftSection={<IconLogout size="1.2rem"/>}>
                                    退出登录
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <ColorSchemeToggle/>
                    </Group>
                </Flex>
            </AppShell.Section>
        </AppShell.Navbar>
    );
}