import { ActionIcon, Anchor, AppShell, Flex, Group, Menu, ScrollArea, Title } from "@mantine/core";
import { IconDotsVertical, IconLayoutSidebarLeftCollapse, IconLogout, IconUserCircle } from "@tabler/icons-react";
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
            <AppShell.Section className={classes.profile}>
                <Flex justify="space-between" align="center" p="xs" w="100%" h={59}>
                    <Profile/>
                    <Group gap={2}>
                        <Menu position="right-start" shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDotsVertical size="1.3rem"/>
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
                    </Group>
                </Flex>
            </AppShell.Section>
            <AppShell.Section className={classes.workspace}>
                <Flex justify="start" align="center" p="xs" w="100%" h={59}>
                    <Anchor href="/">
                        我的待办
                    </Anchor>
                </Flex>
            </AppShell.Section>
            <AppShell.Section grow my="xs" component={ScrollArea}>
                <AppMenu/>
            </AppShell.Section>
            <AppShell.Section className={classes.bottom}>
                <Flex justify="space-between" align="center" p="xs" w="100%" h={40}>
                    <ColorSchemeToggle/>
                    <ActionIcon variant="subtle" color="gray">
                        <IconLayoutSidebarLeftCollapse size="2.4rem"/>
                    </ActionIcon>
                </Flex>
            </AppShell.Section>
        </AppShell.Navbar>
    );
}