import dayjs from "dayjs";
import { useMemo } from "react";
import { createLazyFileRoute } from '@tanstack/react-router'
import { useQueryClient } from "@tanstack/react-query";
import { ActionIcon, Button, Flex, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    MantineReactTable,
    type MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_EditCellTextInput,
    MRT_Row,
    MRT_TableOptions,
    useMantineReactTable
} from "mantine-react-table";
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.esm.mjs";
import { Page } from "@/components/Page";
import { useRoleMutation, useRoleQuery } from "@/hooks/use-role-apis";
import { RoleDTO } from "@/types/role";

const Roles = () => {
    const columns = useMemo<MRT_ColumnDef<RoleDTO>[]>(
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
                enableEditing: true,
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
    const {mutateAsync: createRole, isPending: isCreatingRole} = useRoleMutation({
        action: 'create',
        queryClient
    });
    const {mutateAsync: updateRole, isPending: isUpdatingRole} = useRoleMutation({
        action: 'update',
        queryClient
    });
    const {mutateAsync: deleteRole, isPending: isDeletingRole} = useRoleMutation({
        action: 'delete',
        queryClient
    });

    const handleCreateRole: MRT_TableOptions<RoleDTO>['onCreatingRowSave'] = async ({values, exitCreatingMode,}) => {
        await createRole(values);
        exitCreatingMode();
    }

    const handleUpdateRole: MRT_TableOptions<RoleDTO>['onEditingRowSave'] = async ({values, table,}) => {
        await updateRole(values);
        table.setEditingRow(null); //exit editing mode
    };

    const openDeleteConfirmModal = (row: MRT_Row<RoleDTO>) => {
        modals.openConfirmModal({
            title: '确认',
            children: <Text>确定删除角色【{row.original.name}】？删除后不可恢复。</Text>,
            labels: {confirm: '删除', cancel: '取消'},
            confirmProps: {color: 'red'},
            onConfirm: () => deleteRole(row.original),
        });
    }

    const {data, isError, isLoading} = useRoleQuery();

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
                <Text pl="xs">角色数：{total}</Text>
            </Group>

        ),
        // row actions
        renderRowActions: ({row, table}) => (
            <Flex gap="md">
                <Tooltip label="修改角色">
                    <ActionIcon variant="subtle" onClick={() => table.setEditingRow(row)}>
                        <IconEdit/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="删除角色">
                    <ActionIcon variant="subtle" color="red" onClick={() => openDeleteConfirmModal(row)}>
                        <IconTrash/>
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderEditRowModalContent: ({row, table}) => {
            const internalEditComponents = row
                .getAllCells()
                .filter((cell) => cell.column.columnDef.columnDefType === 'data'
                    && cell.column.columnDef.enableEditing)
                .map((cell) => (
                    <MRT_EditCellTextInput cell={cell} key={cell.id} table={table}/>
                ));
            return (
                <Stack>
                    <Title order={5}>{row.original.id ? '修改' : '创建'}角色</Title>
                    {internalEditComponents}
                    <Flex justify="flex-end">
                        <MRT_EditActionButtons row={row} table={table} variant="text"/>
                    </Flex>
                </Stack>
            )
        },
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
            isSaving: isCreatingRole || isUpdatingRole || isDeletingRole,
            showAlertBanner: isError,
        },
        onCreatingRowSave: handleCreateRole,
        onEditingRowSave: handleUpdateRole,
    });

    return (
        <Page title="角色管理" toolbar={
            <Group>
                <Tooltip label="创建一个新角色">
                    <Button onClick={() => table.setCreatingRow(true)}>添加角色</Button>
                </Tooltip>
            </Group>}>
            <MantineReactTable table={table}/>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/roles')({
    component: Roles,
})