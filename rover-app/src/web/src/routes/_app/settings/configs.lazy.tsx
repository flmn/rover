import { createLazyFileRoute } from '@tanstack/react-router'
import { useMemo } from "react";
import {
    MantineReactTable,
    MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_EditCellTextInput,
    MRT_TableOptions
} from "mantine-react-table";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { ActionIcon, Anchor, Badge, Button, Container, Flex, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { IconExternalLink, IconInfoCircle, IconPencil } from "@tabler/icons-react";
import { ConfigDTO } from "@/types";
import { Toolbar } from '@/components';
import { useConfigMutation, useConfigQuery, useDataTable } from "@/hooks";

const Configs = () => {
    const columns = useMemo<MRT_ColumnDef<ConfigDTO>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 80,
                enableClickToCopy: true,
                enableColumnFilter: false,
                enableEditing: false,
            },
            {
                accessorKey: 'name',
                header: '名称',
                enableColumnFilter: false,
                enableEditing: false,
                Cell: ({cell, row}) => (
                    <Group gap="4">
                        <span>{cell.getValue<string>()}</span>
                        {row.original.description &&
                            <Tooltip label={row.original.description}>
                                <IconInfoCircle size="1.2rem" color="gray"/>
                            </Tooltip>}
                    </Group>
                )
            },
            {
                accessorKey: 'typeText',
                header: '类型',
                size: 60,
                enableEditing: false,
                filterVariant: 'select',
                mantineFilterSelectProps: {
                    data: [
                        {value: 'ENUM', label: '枚举值'},
                        {value: 'INTEGER', label: '数字'},
                        {value: 'PERCENT', label: '百分比'},
                        {value: 'TEXT', label: '文字'},
                        {value: 'URL', label: 'URL'},
                    ],
                },
            },
            {
                accessorKey: 'value',
                header: '值',
                enableColumnFilter: false,
                enableEditing: true,
                mantineEditTextInputProps: {
                    required: true,
                },
                Cell: ({cell, row}) => {
                    if (row.original.type == 'PERCENT') {
                        return (<span>{cell.getValue<string>()}%</span>);
                    } else if (row.original.type == 'URL') {
                        return (
                            <Group align="center" gap="2">
                                <span>{cell.getValue<string>()}</span>
                                <Anchor href={cell.getValue<string>()} target="_blank" inline>
                                    <IconExternalLink size="1.2rem"/>
                                </Anchor>
                            </Group>
                        );
                    } else {
                        return (<span>{cell.getValue<string>()}</span>);
                    }
                },
            },
            {
                accessorKey: 'publicAccess',
                header: '公开访问',
                size: 120,
                enableEditing: false,
                filterVariant: 'checkbox',
                Cell: ({cell}) => (
                    cell.getValue<boolean>() ? <Badge variant="light">是</Badge>
                        : <Badge color="gray" variant="light">否</Badge>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: '创建时间',
                size: 80,
                enableColumnFilter: false,
                enableEditing: false,
                Cell: ({cell}) => (
                    <span>{dayjs(cell.getValue<Date>()).format('YYYY-MM-DD日 HH:mm:ss')}</span>
                ),
            },
            {
                accessorKey: 'updatedAt',
                header: '最后更新时间',
                size: 80,
                enableColumnFilter: false,
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

    const handleUpdateConfig: MRT_TableOptions<ConfigDTO>['onEditingRowSave'] = async ({values, table,}) => {
        await updateConfig(values);
        table.setEditingRow(null); //exit editing mode
    };

    const {data, isError, isLoading} = useConfigQuery();

    const records = data?.records ?? [];
    const total = data?.meta.total ?? 0;

    const table = useDataTable({
        columns,
        data: records,
        rowCount: total,
        // display
        enableColumnFilters: true,
        enableEditing: true,
        mantineEditRowModalProps: {
            closeOnClickOutside: false,
        },
        mantineToolbarAlertBannerProps: isError ? {color: 'red', children: '加载数据失败',} : undefined,
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Group>
                <Text pl="xs">参数数量：{total}</Text>
            </Group>
        ),
        // row actions
        renderRowActions: ({row, table}) => (
            <Flex gap="md">
                <Tooltip label="修改参数">
                    <ActionIcon variant="subtle" onClick={() => table.setEditingRow(row)}>
                        <IconPencil size="1.3rem"/>
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
                    <Title order={4}>修改参数</Title>
                    {internalEditComponents}
                    <Flex justify="flex-end">
                        <MRT_EditActionButtons row={row} table={table} variant="text"/>
                    </Flex>
                </Stack>
            )
        },
        // state
        state: {
            isLoading,
            isSaving: isUpdatingConfig,
            showAlertBanner: isError,
        },
        // callback
        onEditingRowSave: handleUpdateConfig,
    });

    return (
        <Container fluid p="sm">
            <Toolbar>
                <Tooltip label="导出系统参数">
                    <Button>全部导出</Button>
                </Tooltip>
            </Toolbar>
            <MantineReactTable table={table}/>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/settings/configs')({
    component: Configs,
})