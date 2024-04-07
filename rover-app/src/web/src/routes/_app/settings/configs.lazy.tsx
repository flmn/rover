import { createLazyFileRoute } from '@tanstack/react-router'
import { useMemo } from "react";
import {
    MantineReactTable,
    MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_TableOptions,
    useMantineReactTable
} from "mantine-react-table";
import { RoleDTO } from "@/types/role";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { ActionIcon, Flex, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.esm";
import { IconEdit } from "@tabler/icons-react";
import { useConfigMutation, useConfigQuery } from "@/hooks/use-config-apis";
import { Page } from "@/components/Page";
import { ConfigDTO } from "@/types/config";

const Configs = () => {
    const columns = useMemo<MRT_ColumnDef<ConfigDTO>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 80,
                enableClickToCopy: true,
                enableEditing: false,
            },
            {
                accessorKey: 'name',
                header: '名称',
                enableEditing: false,
            },
            {
                accessorKey: 'value',
                header: '值',
                mantineEditTextInputProps: {
                    required: true,
                },
            },
            {
                accessorKey: 'createdAt',
                header: '创建时间',
                size: 80,
                enableEditing: false,
                Cell: ({cell}) => (
                    <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
            {
                accessorKey: 'updatedAt',
                header: '最后更新时间',
                size: 80,
                enableEditing: false,
                Cell: ({cell}) => (
                    cell.getValue() != null &&
                    <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
        ],
        [],
    );

    const queryClient = useQueryClient();

    const {mutateAsync: updateConfig, isPending: isUpdatingConfig} = useConfigMutation({queryClient});

    const handleUpdateConfig: MRT_TableOptions<RoleDTO>['onEditingRowSave'] = async ({values, table,}) => {
        await updateConfig(values);
        table.setEditingRow(null); //exit editing mode
    };

    const {data, isError, isLoading} = useConfigQuery();

    const records = data?.records ?? [];
    const total = data?.meta.total ?? 0;

    const table = useMantineReactTable({
        columns,
        data: records,
        rowCount: total,
        // display
        enableColumnActions: true,
        enableColumnFilters: false,
        enableColumnPinning: true,
        enableDensityToggle: false,
        enableEditing: true,
        enableRowActions: true,
        enableRowNumbers: true,
        enableStickyHeader: true,
        localization: MRT_Localization_ZH_HANS,
        paginationDisplayMode: 'pages',
        positionActionsColumn: 'last',
        positionGlobalFilter: 'left',
        positionToolbarAlertBanner: 'head-overlay',
        mantineTableProps: {
            striped: true,
            withTableBorder: false,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ['10', '15', '20'],
        },
        mantineSearchTextInputProps: {
            variant: 'default',
            w: '300',
        },
        mantineEditRowModalProps: {
            closeOnClickOutside: false,
        },
        mantineToolbarAlertBannerProps: isError ? {color: 'red', children: '加载数据失败',} : undefined,
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Group mih={56}>
                <Text pl="xs">参数数量：{total}</Text>
            </Group>

        ),
        // row actions
        renderRowActions: ({row, table}) => (
            <Flex gap="md">
                <Tooltip label="修改参数">
                    <ActionIcon variant="subtle" onClick={() => table.setEditingRow(row)}>
                        <IconEdit/>
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderEditRowModalContent: ({internalEditComponents, row, table}) => (
            <Stack>
                <Title order={5}>修改参数</Title>
                {internalEditComponents}
                <Flex justify="flex-end">
                    <MRT_EditActionButtons row={row} table={table} variant="text"/>
                </Flex>
            </Stack>
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
            isSaving: isUpdatingConfig,
            showAlertBanner: isError,
        },
        onEditingRowSave: handleUpdateConfig,
    });

    return (
        <Page title="系统参数">
            <MantineReactTable table={table}/>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/configs')({
    component: Configs,
})