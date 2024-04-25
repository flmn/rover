import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
    ActionIcon,
    Badge,
    Button,
    Container,
    Flex,
    Group,
    MultiSelect,
    PasswordInput,
    Stack,
    Switch,
    Text,
    TextInput,
    Tooltip
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import {
    MantineReactTable,
    type MRT_ColumnDef,
    MRT_PaginationState,
    MRT_Row,
    MRT_SortingState
} from 'mantine-react-table';
import { Toolbar } from "@/components";
import { EditorFormProps, useDataTable, useEditor, useGetUserQuery, useUserMutation, useUsersQuery } from "@/hooks";
import { UserDTO } from "@/types";
import { useComboboxQuery } from "@/hooks/use-combobox-items";

const EditForm = (props: EditorFormProps) => {
    const {data: user} = useGetUserQuery(props.id);
    const {data: roles} = useComboboxQuery('/api/platform/roles?type=combobox');
    const form = useForm<UserDTO>({
        mode: 'uncontrolled',
        initialValues: {
            isEnabled: true,
            isLocked: false,
        } as UserDTO,
        enhanceGetInputProps: (payload) => {
            if (!payload.form.initialized) {
                return {disabled: true};
            }

            return {};
        },
    });

    useEffect(() => {
        if (user) {
            form.initialize(user);
        }
    }, [form, user]);

    const {mutateAsync, isPending} = useUserMutation({
        action: props.id ? 'update' : 'create'
    });

    const handleSubmit = async (values: UserDTO) => {
        await mutateAsync(values);

        modals.closeAll();
    };

    const isEditing = !!props.id;

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <TextInput required label="姓名"
                           key={form.key('name')}
                           {...form.getInputProps('name')}/>
                <TextInput required label="电子邮件"
                           data-autofocus
                           placeholder="test@example.com"
                           key={form.key('email')}
                           {...form.getInputProps('email')} />
                <PasswordInput label="密码" placeholder="密码"
                               required={!isEditing}
                               key={form.key('password')}
                               {...form.getInputProps('password')} />
                <MultiSelect clearable searchable label="角色"
                             placeholder="请选择角色"
                             data={roles}
                             key={form.key('roles')}
                             {...form.getInputProps('roles')}/>
                <Switch label="是否激活" size="md"
                        key={form.key('isEnabled')}
                        {...form.getInputProps('isEnabled', {type: 'checkbox'})}/>
                <Switch label="是否锁定" size="md"
                        key={form.key('isLocked')}
                        {...form.getInputProps('isLocked', {type: 'checkbox'})}/>
                <Group justify="end" mt="md">
                    <Button variant="default" onClick={() => modals.closeAll()}>取消</Button>
                    <Button type="submit" loading={isPending}>保存</Button>
                </Group>
            </Stack>
        </form>
    );
}

const Users = () => {
    const columns = useMemo<MRT_ColumnDef<UserDTO>[]>(
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
                size: 80,
            },
            {
                accessorKey: 'email',
                header: '电子邮件',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'isEnabled',
                header: '是否激活',
                size: 60,
                filterVariant: 'checkbox',
                Cell: ({cell}) => (
                    cell.getValue<boolean>() ? <Badge variant="light">正常</Badge>
                        : <Badge color="gray" variant="light">禁用</Badge>
                ),
            },
            {
                accessorKey: 'isLocked',
                header: '是否锁定',
                size: 60,
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
                filterVariant: 'date-range',
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
    const {data, isError, isLoading} = useUsersQuery({
        pagination,
        globalFilter,
        sorting,
    });

    const {mutateAsync: deleteUser, isPending: isDeletingUser} = useUserMutation({
        action: 'delete'
    });

    const editor = useEditor({
        entityName: '用户',
        size: 'xl',
        form: (props) => (<EditForm {...props}/>),
    });

    const openDeleteConfirmModal = (row: MRT_Row<UserDTO>) => {
        modals.openConfirmModal({
            title: '确认',
            children: <Text>确定删除用户【{row.original.name}】？删除后不可恢复。</Text>,
            labels: {confirm: '删除', cancel: '取消'},
            confirmProps: {color: 'red'},
            onConfirm: () => deleteUser(row.original),
        });
    }

    const items = data?.items ?? [];
    const total = data?.total ?? 0;

    const table = useDataTable({
        columns,
        data: items,
        rowCount: total,
        // display
        enableRowSelection: true,
        manualSorting: true,
        mantineToolbarAlertBannerProps: isError ? {color: 'red', children: '加载数据失败',} : undefined,
        // filtering
        manualFiltering: true,
        // pagination
        manualPagination: true,
        // row actions
        renderRowActions: ({row}) => (
            <Flex gap="md">
                <Tooltip label="编辑用户">
                    <ActionIcon variant="subtle" onClick={() => editor.edit(row.original.id)}>
                        <IconPencil size="1.3rem"/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="删除用户">
                    <ActionIcon variant="subtle" color="red" onClick={() => openDeleteConfirmModal(row)}>
                        <IconTrash size="1.3rem"/>
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        // toolbar
        renderBottomToolbarCustomActions: () => (
            <Text pl="xs">用户数：{total}</Text>
        ),
        // state
        state: {
            isLoading,
            isSaving: isDeletingUser,
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
    return (
        <Container fluid p="sm">
            <Toolbar>
                <Tooltip label="创建一个新用户">
                    <Button onClick={editor.create}>添加用户</Button>
                </Tooltip>
            </Toolbar>
            <MantineReactTable table={table}/>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/settings/users/')({
    component: Users,
})
