import { createFileRoute } from '@tanstack/react-router'
import { Container, Group, Paper, SimpleGrid, Text } from '@mantine/core'
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus
} from '@tabler/icons-react'
import classes from './index.module.css'

const Index = () => {
  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin
  }

  const data = [
    { title: '收入', icon: 'receipt', value: '13,456', diff: 34 },
    { title: '利润', icon: 'coin', value: '4,145', diff: -13 },
    { title: '优惠券消耗', icon: 'discount', value: '745', diff: 18 },
    { title: '新客户', icon: 'user', value: '188', diff: -30 }
  ] as const

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>与上月相比</Text>
      </Paper>
    )
  })
  return (
    <Container fluid p="sm" className={classes.stats}>
      <SimpleGrid cols={4}>{stats}</SimpleGrid>
    </Container>
  )
}

export const Route = createFileRoute('/_app/')({
  component: Index
})
