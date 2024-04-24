import { useEffect, useMemo } from "react";
import { createLazyFileRoute } from '@tanstack/react-router'
import { MantineReactTable, MRT_ColumnDef, MRT_TableOptions } from "mantine-react-table";
import dayjs from "dayjs";
import {
    ActionIcon,
    Anchor,
    Badge,
    Button,
    Container,
    Flex,
    Group,
    NumberInput,
    Stack,
    Text,
    TextInput,
    Tooltip
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconExternalLink, IconInfoCircle, IconPencil } from "@tabler/icons-react";
import { ConfigDTO } from "@/types";
import { Toolbar } from '@/components';
import { EditorFormProps, useConfigMutation, useConfigQuery, useConfigsQuery, useDataTable, useEditor } from "@/hooks";
import { modals } from "@mantine/modals";

const EditForm = (props: EditorFormProps) => {
    const {data: config} = useConfigQuery(`${props.id}`);
    const form = useForm<ConfigDTO>({
        mode: 'uncontrolled',
        initialValues: {} as ConfigDTO,
        enhanceGetInputProps: (payload) => {
            if (!payload.form.initialized) {
                return {disabled: true};
            }

            return {};
        },
    });

    useEffect(() => {
        if (config) {
            form.initialize(config);
        }
    }, [form, config]);

    const {mutateAsync, isPending} = useConfigMutation();

    const handleSubmit = async (values: ConfigDTO) => {
        await mutateAsync(values);

        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <Text fz="sm">{config?.description}</Text>
                <TextInput disabled label="ID"
                           key={form.key('id')}
                           {...form.getInputProps('id')}
                />
                {config?.type === 'TEXT' && <TextInput required label="值"
                                                       key={form.key('value')}
                                                       {...form.getInputProps('value')}
                />}
                {config?.type === 'PERCENT' && <NumberInput
                    required label="值" suffix="%" clampBehavior="strict" min={0} max={100}
                    key={form.key('value')}
                    {...form.getInputProps('value')}
                />}
                <Group justify="end" mt="md">
                    <Button variant="default" onClick={() => modals.closeAll()}>取消</Button>
                    <Button type="submit" loading={isPending}>保存</Button>
                </Group>
            </Stack>
        </form>
    );
}

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

    const {mutateAsync: updateConfig, isPending: isUpdatingConfig} = useConfigMutation();

    const handleUpdateConfig: MRT_TableOptions<ConfigDTO>['onEditingRowSave'] = async ({values,}) => {
        await updateConfig(values);
    };

    const editor = useEditor({
        entityName: '系统参数',
        size: 'xl',
        form: (props) => (<EditForm {...props}/>),
    });

    const {data, isError, isLoading} = useConfigsQuery();

    const items = data?.items ?? [];
    const total = data?.total ?? 0;

    const table = useDataTable({
        columns,
        data: items,
        rowCount: total,
        // display
        enableColumnFilters: true,
        mantineToolbarAlertBannerProps: isError ? {color: 'red', children: '加载数据失败',} : undefined,
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Group>
                <Text pl="xs">参数数量：{total}</Text>
            </Group>
        ),
        // row actions
        renderRowActions: ({row}) => (
            <Flex gap="md">
                <Tooltip label="修改参数">
                    <ActionIcon variant="subtle" onClick={() => editor.edit(row.original.id)}>
                        <IconPencil size="1.3rem"/>
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
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