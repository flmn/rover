import { useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useAccountQuery, useLogoutMutation } from "@/hooks";

export function Account() {
    const navigate = useNavigate()
    const {data} = useAccountQuery();
    const {mutateAsync: logout} = useLogoutMutation();

    const name = data?.name ?? '用户';

    const handleLogout = useCallback(async () => {
        await logout()

        await navigate({to: '/login'})

        notifications.show({
            title: '通知',
            message: '已退出登录。',
        })
    }, [navigate, logout]);

    return (
        <Group gap="xs">
            <Text>{name}</Text>
            <Menu position="bottom-end" shadow="md" width={150}>
                <Menu.Target>
                    <UnstyledButton>
                        <Avatar radius="xl">{data?.avatar}</Avatar>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUserCircle size="1.2rem"/>}
                               to="/account/profile" component={Link}>
                        个人资料
                    </Menu.Item>
                    <Menu.Item leftSection={<IconLogout size="1.2rem"/>} onClick={handleLogout}>
                        退出登录
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}