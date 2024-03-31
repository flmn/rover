import { useMemo, useState } from "react";
import { ActionIcon, Badge, Button, Group, Menu, rem, Tooltip } from "@mantine/core";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import {
    MantineReactTable,
    type MRT_ColumnDef,
    MRT_PaginationState,
    MRT_SortingState,
    useMantineReactTable
} from 'mantine-react-table';
import { MRT_Localization_ZH_HANS } from 'mantine-react-table/locales/zh-Hans/index.esm.mjs';
import { Page } from "@/components/Page";
import { UserVO } from "@/types/user.ts";
import { useFetchUsers } from "@/hooks/use-fetch-users.ts";
import dayjs from "dayjs";

const Users = () => {

    const columns = useMemo<MRT_ColumnDef<UserVO>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 120,
                enableClickToCopy: true,
            },
            {
                accessorKey: 'name',
                header: '姓名',
            },
            {
                accessorKey: 'email',
                header: '电子邮件',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'isEnabled',
                header: '是否激活',
                size: 80,
                filterVariant: 'checkbox',
                Cell: ({cell}) => (
                    cell.getValue<boolean>() ? <Badge variant="light">正常</Badge>
                        : <Badge color="gray" variant="light">禁用</Badge>
                ),
            },
            {
                accessorKey: 'isLocked',
                header: '是否锁定',
                size: 80,
                filterVariant: 'checkbox',
                Cell: ({cell}) => (
                    cell.getValue<boolean>() && <Badge color="red" variant="light">
                        已锁定
                    </Badge>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: '创建时间',
                filterVariant: 'date-range',
                Cell: ({cell}) => (
                    <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
            {
                accessorKey: 'updatedAt',
                header: '最后更新时间',
                Cell: ({cell}) => (
                    cell.column && <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
        ],
        [],
    );

    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    // const {isPending, data} = useQuery({queryKey: ['users'], queryFn: fetchUsers})
    const {data, isError, isFetching, isLoading, refetch} = useFetchUsers({
        pagination,
        sorting,
    });

    const records = data?.records ?? [];
    const total = data?.meta.total ?? 0;

    const table = useMantineReactTable({
        columns,
        data: records,
        rowCount: total,
        enableRowNumbers: true,
        enableGlobalFilter: true,
        enableDensityToggle: false,
        enableColumnActions: false,
        localization: MRT_Localization_ZH_HANS,
        // display
        enableStickyHeader: true,
        mantineTableProps: {
            striped: true,
        },
        // filtering
        // manualFiltering: true,
        // columnFilterDisplayMode: 'popover',
        // sorting
        manualSorting: true,
        // row selection
        enableRowSelection: true,
        positionToolbarAlertBanner: 'head-overlay',
        // row actions
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActionMenuItems: () => (
            <>
                <Menu.Item leftSection={<IconEdit style={{width: rem(14), height: rem(14)}}/>}
                           onClick={() => console.info('Edit')}>编辑</Menu.Item>
                <Menu.Item color="red" leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
                           onClick={() => console.info('Delete')}>删除</Menu.Item>
            </>
        ),
        // pagination
        manualPagination: true,
        paginationDisplayMode: 'pages',
        mantinePaginationProps: {
            rowsPerPageOptions: ['10', '15', '20'],
        },
        initialState: {
            density: 'xs',
        },
        state: {
            isLoading,
            pagination,
            sorting,
            showAlertBanner: isError,
            showProgressBars: isFetching,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        renderTopToolbarCustomActions: () => (
            <Group>
                <Tooltip label="创建一个新用户">
                    <Button>添加用户</Button>
                </Tooltip>
                <Tooltip label="Refresh Data">
                    <ActionIcon variant="white" onClick={() => refetch()}>
                        <IconRefresh/>
                    </ActionIcon>
                </Tooltip>
            </Group>
        ),
    });

    return (
        <Page title="用户管理">
            <MantineReactTable table={table}/>
        </Page>
    );
}

export const Route = createFileRoute('/_app/settings/users')({
    component: Users,
})
