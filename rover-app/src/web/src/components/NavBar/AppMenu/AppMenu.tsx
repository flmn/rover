import { ActionIcon, Menu, NavLink, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import {
    IconAdjustments,
    IconCpu,
    IconHome,
    IconPlane,
    IconPlaneTilt,
    IconSettings,
    IconUsers,
    IconUsersGroup,
    IconVocabulary
} from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MenuModel } from "@/types";

const menus: MenuModel[] = [
    {
        icon: <IconHome size="1.5rem" stroke={1.5}/>,
        label: '首页',
        path: '/',
    },
    {
        icon: <IconPlaneTilt size="1.5rem" stroke={1.5}/>,
        label: '机队管理',
        path: '/fleet',
        children: [
            {
                icon: <IconPlane size="1.5rem" stroke={1.5}/>,
                label: '飞机管理',
                path: '/fleet/aircrafts',
            },
        ]
    },
    {
        icon: <IconSettings size="1.5rem" stroke={1.5}/>,
        label: '系统设置',
        path: '/settings',
        children: [
            {
                icon: <IconUsers size="1.5rem" stroke={1.5}/>,
                label: '用户管理',
                path: '/settings/users',
            },
            {
                icon: <IconUsersGroup size="1.5rem" stroke={1.5}/>,
                label: '角色管理',
                path: '/settings/roles',
            },
            {
                icon: <IconVocabulary size="1.5rem" stroke={1.5}/>,
                label: '数据字典管理',
                path: '/settings/enums',
            },
            {
                icon: <IconAdjustments size="1.5rem" stroke={1.5}/>,
                label: '系统参数',
                path: '/settings/configs',
            },
            {
                icon: <IconCpu size="1.5rem" stroke={1.5}/>,
                label: '系统信息',
                path: '/settings/server-info',
            },
        ]
    },
];

interface AppMenuProps {
    collapsed: boolean;
}

function NormalMenu({pathname}: { pathname: string }) {
    return (
        <Stack gap={0}>
            {menus.map((item, index) => {
                if (!item.children) {
                    return (
                        <NavLink label={item.label} to={item.path} component={Link}
                                 leftSection={item.icon}
                                 active={pathname === item.path}
                                 key={index}/>
                    );
                } else {
                    return (
                        <NavLink label={item.label} href="#"
                                 leftSection={item.icon}
                                 childrenOffset={24}
                                 defaultOpened={pathname.startsWith(item.path)}
                                 key={index}>
                            {item.children.map((sub, indexSub) => (
                                <NavLink label={sub.label} to={sub.path} component={Link}
                                         leftSection={sub.icon}
                                         active={pathname === sub.path}
                                         key={indexSub}/>
                            ))}
                        </NavLink>
                    );
                }
            })}
        </Stack>
    );
}

function CollapsedMenu() {
    return (
        <Stack gap={0} align="center">
            {menus.map((item, index) => {
                if (!item.children) {
                    return (
                        <UnstyledButton h={40} to={item.path} component={Link}>
                            <Tooltip label={item.label} key={index}>
                                <ActionIcon variant="subtle" color="black">{item.icon}</ActionIcon>
                            </Tooltip>
                        </UnstyledButton>
                    );
                } else {
                    return (
                        <Menu trigger="click-hover" position="right-start"
                              width={180} shadow="md" offset={16}>
                            <Menu.Target>
                                <UnstyledButton h={40}>
                                    <Tooltip label={item.label} key={index}>
                                        <ActionIcon variant="subtle" color="black">{item.icon}</ActionIcon>
                                    </Tooltip>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {item.children.map((sub, indexSub) => (
                                    <Menu.Item leftSection={sub.icon}
                                               to={sub.path} component={Link}
                                               key={indexSub}>
                                        {sub.label}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                    );
                }
            })}
        </Stack>
    );
}

export function AppMenu(props: AppMenuProps) {
    const state = useRouterState({
        select: (state) => state.location,
    })

    if (props.collapsed) {
        return <CollapsedMenu/>
    } else {
        return <NormalMenu pathname={state.pathname}/>
    }
}