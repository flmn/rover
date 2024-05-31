import { useMemo, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ActionIcon, Button, Container, Flex, Text, Tooltip } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState, MRT_SortingState } from 'mantine-react-table'
import dayjs from 'dayjs'
import { Toolbar } from '@/components'
import { EditorFormProps, useAirportsQuery, useDataTable, useEditor } from '@/hooks'
import { AirportDTO } from '@/types'

const EditForm = (props: EditorFormProps) => {
  return (
    <>
      {props.id}
    </>
  )
}

const Airports = () => {
  const columns = useMemo<MRT_ColumnDef<AirportDTO>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 120,
        enableClickToCopy: true
      },
      {
        accessorKey: 'iataCode',
        header: 'IATA',
        enableClickToCopy: true
      },
      {
        accessorKey: 'name',
        header: '名称',
        size: 80
      },
      {
        accessorKey: 'createdAt',
        header: '创建时间',
        filterVariant: 'date-range',
        Cell: ({ cell }) => (
          <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      },
      {
        accessorKey: 'updatedAt',
        header: '最后更新时间',
        filterVariant: 'date-range',
        Cell: ({ cell }) => (
          cell.getValue() != null &&
          <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      }
    ],
    []
  )

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const { data, isError, isLoading } = useAirportsQuery({
    pagination,
    globalFilter,
    sorting
  })

  const editor = useEditor({
    entityName: '机场',
    size: 'xl',
    form: (props) => (<EditForm {...props} />)
  })

  const items = data?.items ?? []
  const total = data?.total ?? 0

  const table = useDataTable({
    columns,
    data: items,
    rowCount: total,
    // display
    manualSorting: true,
    mantineToolbarAlertBannerProps: isError ? { color: 'red', children: '加载数据失败' } : undefined,
    // filtering
    manualFiltering: true,
    // pagination
    manualPagination: true,
    // row actions
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="编辑机场">
          <ActionIcon variant="subtle" onClick={() => editor.edit(row.original.id)}>
            <IconPencil size="1.3rem" />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    // toolbar
    renderBottomToolbarCustomActions: () => (
      <Text pl="xs">机场数：{total}</Text>
    ),
    // state
    state: {
      isLoading,
      pagination,
      globalFilter,
      sorting,
      showAlertBanner: isError
    },
    // callback
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting
  })
  return (
    <Container fluid p="sm">
      <Toolbar>
        <Tooltip label="创建一个新机场">
          <Button onClick={editor.create}>添加机场</Button>
        </Tooltip>
      </Toolbar>
      <MantineReactTable table={table} />
    </Container>
  )
}

export const Route = createLazyFileRoute('/_app/data/airports/')({
  component: Airports
})