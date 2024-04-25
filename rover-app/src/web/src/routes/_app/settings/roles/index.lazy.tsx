import React, { useEffect, useState } from "react";
import { createLazyFileRoute } from '@tanstack/react-router'
import {
    ActionIcon,
    Button,
    Center,
    Container,
    Flex,
    Group,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Tooltip,
    UnstyledButton
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Toolbar } from "@/components";
import { EditorFormProps, useEditor, useGetRoleQuery, useRoleMutation, useRolesQuery } from "@/hooks";
import { RoleDTO } from "@/types";
import classes from "./index.lazy.module.css";
import { modals } from "@mantine/modals";

const EditForm = (props: EditorFormProps) => {
    const {data: role} = useGetRoleQuery(props.id);
    const form = useForm<RoleDTO>({
        mode: 'uncontrolled',
        initialValues: {} as RoleDTO,
        enhanceGetInputProps: (payload) => {
            if (!payload.form.initialized) {
                return {disabled: true};
            }

            return {};
        },
    });

    useEffect(() => {
        if (role) {
            form.initialize(role);
        }
    }, [form, role]);

    const {mutateAsync, isPending} = useRoleMutation({
        action: props.id ? 'update' : 'create'
    });

    const handleSubmit = async (values: RoleDTO) => {
        console.log(values);

        await mutateAsync(values);

        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <TextInput required label="角色名称"
                           key={form.key('name')}
                           {...form.getInputProps('name')}/>
                <Group justify="end" mt="md">
                    <Button variant="default" onClick={() => modals.closeAll()}>取消</Button>
                    <Button type="submit" loading={isPending}>保存</Button>
                </Group>
            </Stack>
        </form>
    );
}

const RolesList = ({activeRole, setActiveRole}: {
    activeRole: RoleDTO | undefined,
    setActiveRole: React.Dispatch<React.SetStateAction<RoleDTO | undefined>>
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 200,);
    const handleClear = () => {
        setSearchValue('');
    };

    const {data} = useRolesQuery();

    const items = data?.items ?? [];

    const filteredItems = items.filter(item =>
        item.id.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        || item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const roles = filteredItems?.map((roleDTO) => (
        <UnstyledButton className={classes.role} key={roleDTO.id}
                        data-active={activeRole === roleDTO || undefined}
                        onClick={(event) => {
                            event.preventDefault();
                            setActiveRole(roleDTO);
                        }}>
            <Stack gap={1} justify="space-between">
                {roleDTO.name}
            </Stack>
        </UnstyledButton>
    ));

    return (
        <Stack w={300} pr="sm" className={classes.rolesList}>
            <TextInput placeholder="搜索" value={searchValue}
                       leftSection={<IconSearch/>}
                       rightSection={
                           searchValue ? (
                               <ActionIcon variant="transparent" size="sm" color="gray"
                                           disabled={!searchValue?.length}
                                           onClick={handleClear}>
                                   <Tooltip label="清除搜索">
                                       <IconX/>
                                   </Tooltip>
                               </ActionIcon>
                           ) : null
                       }
                       onChange={(event) => setSearchValue(event.target.value)}/>
            <ScrollArea scrollbars="y" w={280}>
                <Stack>
                    {roles}
                </Stack>
            </ScrollArea>
        </Stack>
    );
}

const RoleDetails = ({activeRole}: {
    activeRole: RoleDTO | undefined
}) => {
    if (activeRole === undefined) {
        return (
            <Center w="100%">
                <Text size="xl">请从左侧列表选择一个角色。</Text>
            </Center>
        );
    }

    return (
        <>
            {activeRole?.name}
        </>
    );
}

const Roles = () => {
    const [activeRole, setActiveRole] = useState<RoleDTO | undefined>(undefined);


    // const {mutateAsync: deleteRole, isPending: isDeletingRole} = useRoleMutation({
    //     action: 'delete'
    // });

    // const openDeleteConfirmModal = (row: MRT_Row<RoleDTO>) => {
    //     modals.openConfirmModal({
    //         title: '确认',
    //         children: <Text>确定删除角色【{row.original.name}】？删除后不可恢复。</Text>,
    //         labels: {confirm: '删除', cancel: '取消'},
    //         confirmProps: {color: 'red'},
    //         onConfirm: () => deleteRole(row.original),
    //     });
    // }

    const editor = useEditor({
        entityName: '角色',
        size: 'xl',
        form: (props) => (<EditForm {...props}/>),
    });

    return (
        <Container fluid p="sm">
            <Toolbar>
                <Tooltip label="创建一个新角色">
                    <Button onClick={() => editor.create()}>添加角色</Button>
                </Tooltip>
            </Toolbar>
            <Flex className={classes.root} gap="sm">
                <RolesList activeRole={activeRole} setActiveRole={setActiveRole}/>
                <RoleDetails activeRole={activeRole}/>
            </Flex>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/settings/roles/')({
    component: Roles,
})