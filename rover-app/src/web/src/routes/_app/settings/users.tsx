import { useMemo, useState } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { MantineReactTable, type MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ZH_HANS } from 'mantine-react-table/locales/zh-Hans/index.esm.mjs';
import { Page } from "@/components/Page";
import { UserVO } from "@/types/user.ts";
import { useFetchUsers } from "@/hooks/use-fetch-users.ts";

const Users = () => {

    const columns = useMemo<MRT_ColumnDef<UserVO>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'email',
                header: '电子邮件',
            },
            {
                accessorKey: 'isEnabled',
                header: '激活',
            },
            {
                accessorKey: 'isLocked',
                header: '锁定',
            },
            {
                accessorKey: 'createdAt',
                header: '创建时间',
            },
            {
                accessorKey: 'updatedAt',
                header: '最后更新时间',
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
        enableEditing: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
        enableDensityToggle: false,
        rowCount: total,
        manualPagination: true,
        paginationDisplayMode: 'pages',
        mantinePaginationProps: {
            rowsPerPageOptions: ['10', '15', '20'],
        },
        localization: MRT_Localization_ZH_HANS,
        onPaginationChange: setPagination,
        initialState: {
            density: 'xs',
        },
        state: {
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
        },
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
