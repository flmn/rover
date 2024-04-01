import dayjs from "dayjs";
import { useMemo } from "react";
import { createLazyFileRoute } from '@tanstack/react-router'
import { Button, Group, Text, Tooltip } from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.esm.mjs";
import { Page } from "@/components/Page";
import { RoleVO } from "@/types/role.ts";
import { useQuery } from "@tanstack/react-query";
import { ListResultVO } from "@/types/list-result.ts";
import { fetchWithAuthHeader } from "@/apis/auth.ts";

const Roles = () => {
    const columns = useMemo<MRT_ColumnDef<RoleVO>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 120,
                enableClickToCopy: true,
            },
            {
                accessorKey: 'name',
                header: '名称',
                size: 80,
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

    const {data, isError, isLoading} = useQuery<ListResultVO<RoleVO>>({
        queryKey: ['roles'],
        queryFn: () => fetchWithAuthHeader('/api/platform/roles') as Promise<ListResultVO<RoleVO>>,
        staleTime: 30_000, // 30s
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
        enableColumnPinning: true,
        enableColumnFilters: false,
        enablePagination: false,
        localization: MRT_Localization_ZH_HANS,
        positionGlobalFilter: 'left',
        positionToolbarAlertBanner: 'head-overlay',
        mantineTableProps: {
            striped: true,
        },
        mantineSearchTextInputProps: {
            variant: 'default',
            w: '300',
        },
        mantineToolbarAlertBannerProps: isError ? {color: 'red', children: '加载数据失败',} : undefined,
        // row actions
        enableRowActions: true,
        positionActionsColumn: 'last',
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Group mih={56}>
                <Text pl="xs">角色数：{total}</Text>
            </Group>

        ),
        // state
        initialState: {
            density: 'xs',
            showGlobalFilter: true,
            columnPinning: {
                right: ['mrt-row-actions'],
            },
        },
        state: {
            isLoading,
            showAlertBanner: isError,
        },
    });

    return (
        <Page title="角色管理" toolbar={
            <Group>
                <Tooltip label="创建一个新角色">
                    <Button>添加角色</Button>
                </Tooltip>
            </Group>
        }>
            <MantineReactTable table={table}/>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/roles')({
    component: Roles,
})