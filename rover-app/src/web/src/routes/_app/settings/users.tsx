import { useMemo, useState } from "react";
import { ActionIcon, Menu, rem, Tooltip } from "@mantine/core";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { MantineReactTable, type MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table';
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
                header: '激活',
                size: 80,
                Cell: ({cell}) => (
                    <span>{cell.getValue<boolean>().toLocaleString()}</span>
                ),
            },
            {
                accessorKey: 'isLocked',
                header: '锁定',
                size: 80,
                Cell: ({cell}) => (
                    <span>{cell.getValue<boolean>().toLocaleString()}</span>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: '创建时间',
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

    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    // const {isPending, data} = useQuery({queryKey: ['users'], queryFn: fetchUsers})
    const {data, isError, isFetching, isLoading, refetch} = useFetchUsers({
        pagination,
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
            showAlertBanner: isError,
            showProgressBars: isFetching,
        },
        onPaginationChange: setPagination,
        renderTopToolbarCustomActions: () => (
            <Tooltip label="Refresh Data">
                <ActionIcon onClick={() => refetch()}>
                    <IconRefresh/>
                </ActionIcon>
            </Tooltip>
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
