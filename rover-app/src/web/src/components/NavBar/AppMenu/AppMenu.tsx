import { useAtom } from 'jotai'
import { Group, Menu, NavLink, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import { Link, useRouterState } from '@tanstack/react-router'
import { menus } from '@/config'
import { collapsedAtom } from '@/store'
import classes from './AppMenu.module.css'

function NormalMenu({ pathname }: { pathname: string }) {
  return (
    <Stack gap={0}>
      {menus.map((item, index) => {
        if (!item.children) {
          return (
            <NavLink label={item.label} to={item.path} component={Link}
                     leftSection={item.icon}
                     active={pathname === item.path}
                     key={index} />
          )
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
                         key={indexSub} />
              ))}
            </NavLink>
          )
        }
      })}
    </Stack>
  )
}

function CollapsedMenu({ pathname }: { pathname: string }) {
  return (
    <Stack gap={0} align="center">
      {menus.map((item, index) => {
        if (!item.children) {
          return (
            <UnstyledButton h={48} w={59}
                            to={item.path} component={Link}
                            data-active={pathname === item.path || undefined}
                            className={classes.iconButton}
                            key={index}>
              <Group justify="center" align="center">
                <Tooltip label={item.label} key={index}>
                  {item.icon}
                </Tooltip>
              </Group>
            </UnstyledButton>
          )
        } else {
          return (
            <Menu trigger="click-hover" position="right-start"
                  width={180} shadow="md" offset={16}
                  key={index}>
              <Menu.Target>
                <UnstyledButton h={48} w={59}
                                data-active={pathname.startsWith(item.path) || undefined}
                                className={classes.iconButton}>
                  <Group justify="center" align="center">
                    <Tooltip label={item.label}>
                      {item.icon}
                    </Tooltip>
                  </Group>
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
          )
        }
      })}
    </Stack>
  )
}

export function AppMenu() {
  const [collapsed] = useAtom(collapsedAtom)
  const state = useRouterState({
    select: (state) => state.location
  })

  if (collapsed) {
    return <CollapsedMenu pathname={state.pathname} />
  } else {
    return <NormalMenu pathname={state.pathname} />
  }
}