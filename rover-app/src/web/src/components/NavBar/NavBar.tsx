import { NavLink, Stack } from "@mantine/core";
import {
    IconHome,
    IconPlane,
    IconPlaneTilt,
    IconSettings,
    IconUsers,
    IconUsersGroup,
    IconVocabulary
} from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";

export function NavBar() {
    const state = useRouterState({
        select: (state) => state.location,
    })

    return (
        <Stack gap={0}>
            <NavLink label="首页" to="/" component={Link}
                     leftSection={<IconHome size="1.5rem" stroke={1.5}/>}
                     active={state.pathname === '/'}/>

            <NavLink label="机队管理" href="#"
                     leftSection={<IconPlaneTilt size="1.5rem" stroke={1.5}/>}
                     childrenOffset={28}
                     defaultOpened={state.pathname.startsWith('/fleet')}>
                <NavLink label="飞机管理" to="/fleet/aircrafts" component={Link}
                         leftSection={<IconPlane size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/fleet/aircrafts'}/>
            </NavLink>

            <NavLink label="设置" href="#"
                     leftSection={<IconSettings size="1.5rem" stroke={1.5}/>}
                     childrenOffset={28}
                     defaultOpened={state.pathname.startsWith('/settings')}>
                <NavLink label="用户管理" to="/settings/users" component={Link}
                         leftSection={<IconUsers size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/settings/users'}/>
                <NavLink label="角色管理" to="/settings/roles" component={Link}
                         leftSection={<IconUsersGroup size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/settings/roles'}/>
                <NavLink label="数据字典管理" to="/settings/enums" component={Link}
                         leftSection={<IconVocabulary size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/settings/enums'}/>
            </NavLink>
        </Stack>
    );
}