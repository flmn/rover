import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Badge, Button, Drawer, Group, Menu, rem, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import {
    MantineReactTable,
    type MRT_ColumnDef,
    MRT_PaginationState,
    MRT_SortingState,
    useMantineReactTable
} from 'mantine-react-table';
import { MRT_Localization_ZH_HANS } from 'mantine-react-table/locales/zh-Hans/index.esm.mjs';
import { useFetchUsers } from "@/hooks/use-fetch-users.ts";
import { UserVO } from "@/types/user.ts";
import { Page } from "@/components/Page";
import { UserForm } from "@/components/routes/settings/users";

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
                    cell.getValue() != null &&
                    <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
        ],
        [],
    );

    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const {data, isError, isLoading} = useFetchUsers({
        pagination,
        globalFilter,
        sorting,
    });

    const records = data?.records ?? [];
    const total = data?.meta.total ?? 0;

    const table = useMantineReactTable({
        columns,
        data: records,
        rowCount: total,
        // display
        enableColumnActions: true,
        enableRowNumbers: true,
        enableDensityToggle: false,
        enableStickyHeader: true,
        mantineTableProps: {
            striped: true,
        },
        localization: MRT_Localization_ZH_HANS,
        // filtering
        enableGlobalFilter: true,
        enableColumnFilters: false,
        manualFiltering: true,
        positionGlobalFilter: 'left',
        mantineSearchTextInputProps: {
            variant: 'default',
            w: '300',
        },
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
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Text>记录数：{total}</Text>
        ),
        // state
        initialState: {
            density: 'xs',
            showGlobalFilter: true,
        },
        state: {
            isLoading,
            pagination,
            globalFilter,
            sorting,
            showAlertBanner: isError,
        },
        // callback
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
    });

    const [opened, handlers] = useDisclosure(false);

    return (
        <>
            <Page title="用户管理" toolbar={
                <Group>
                    <Tooltip label="创建一个新用户">
                        <Button onClick={handlers.open}>添加用户</Button>
                    </Tooltip>
                </Group>
            }>
                <MantineReactTable table={table}/>
            </Page>
            <Drawer title="添加用户" position="right" size="lg" offset={4} radius="sm"
                    opened={opened} onClose={handlers.close}>
                <UserForm/>
            </Drawer>
        </>
    );
}

export const Route = createFileRoute('/_app/settings/users')({
    component: Users,
})
