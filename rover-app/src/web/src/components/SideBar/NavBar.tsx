import { NavLink, Stack } from "@mantine/core";
import { IconHome, IconPlane, IconPlaneTilt, IconSettings, IconUsers, IconVocabulary } from "@tabler/icons-react";
import { useRouterState } from "@tanstack/react-router";

export function NavBar() {
    const state = useRouterState({
        select: (state) => state.location,
    })

    console.log(state);

    return (
        <Stack gap={0}>
            <NavLink label="首页" href="/"
                     leftSection={<IconHome size="1.5rem" stroke={1.5}/>}
                     active={state.pathname === '/'}/>

            <NavLink label="机队管理" href="#required-for-focus"
                     leftSection={<IconPlaneTilt size="1.5rem" stroke={1.5}/>}
                     childrenOffset={28}
                     defaultOpened={state.pathname.startsWith('/fleet')}>
                <NavLink label="飞机管理" href="/fleet/aircrafts"
                         leftSection={<IconPlane size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/fleet/aircrafts'}/>
            </NavLink>

            <NavLink label="设置" href="#"
                     leftSection={<IconSettings size="1.5rem" stroke={1.5}/>}
                     childrenOffset={28}
                     defaultOpened={state.pathname.startsWith('/settings')}>
                <NavLink label="用户管理" href="/settings/users"
                         leftSection={<IconUsers size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/settings/users'}/>
                <NavLink label="数据字典管理" href="/settings/enums"
                         leftSection={<IconVocabulary size="1.2rem" stroke={1.5}/>}
                         active={state.pathname === '/settings/enums'}/>
            </NavLink>
        </Stack>
    );
}