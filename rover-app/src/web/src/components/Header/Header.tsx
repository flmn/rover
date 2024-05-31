import { useAtom } from 'jotai'
import { ActionIcon, Anchor, AppShell, Breadcrumbs, Flex, Group, Text } from '@mantine/core'
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from '@tabler/icons-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ColorSchemeToggle } from '@/components'
import { collapsedAtom } from '@/store'
import { splitPath } from '@/utils'
import { Account } from './Account'
import classes from './Header.module.css'
import { getMenuName } from '@/config'

export function Header() {
  const [collapsed, setCollapsed] = useAtom(collapsedAtom)
  const state = useRouterState({
    select: (state) => state.location
  })

  const segments = splitPath(state.pathname)

  const breadcrumbs = segments.map((item, index) => {
    if (index === 0 && item === '/') {
      return <Anchor to="/" fz="14px" component={Link} key={index}>首页</Anchor>
    } else {
      return <Text fz="14px" key={index}>{getMenuName(item)}</Text>
    }
  })

  return (
    <AppShell.Header>
      <Flex justify="space-between" align="center" className={classes.root} w="100%">
        <Group gap="md" pl="xs">
          <ActionIcon variant="subtle" color="gray" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <IconLayoutSidebarRightCollapse size="2.4rem" /> :
              <IconLayoutSidebarLeftCollapse size="2.4rem" />}
          </ActionIcon>
          <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
        </Group>
        <Group gap="md" pr="md">
          <ColorSchemeToggle />
          <Account />
        </Group>
      </Flex>
    </AppShell.Header>
  )
}
