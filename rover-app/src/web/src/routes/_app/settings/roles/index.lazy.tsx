import React, { useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router"
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Container,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Stack,
    Tabs,
    Text,
    Textarea,
    TextInput,
    Title,
    Tooltip,
    UnstyledButton
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconListDetails, IconPlus, IconSearch, IconUsers, IconX } from "@tabler/icons-react";
import { z } from "zod";
import { PrivilegeSelect } from "@/components";
import { EditorFormProps, useEditor, useGetRoleQuery, useRoleMutation, useRolesQuery } from "@/hooks";
import { RoleDTO } from "@/types";
import classes from "./index.lazy.module.css";

const schema = z.object({
    name: z.string()
        .min(1, '角色名称至少1个字符')
        .max(10, '角色名称最多10个字符'),
    description: z.string()
        .max(100, '描述最多100个字符')
        .optional(),
});

const EditForm = ({id, setActiveRoleId}: {
    setActiveRoleId: React.Dispatch<React.SetStateAction<string | undefined>>
} & EditorFormProps) => {
    const {data: role} = useGetRoleQuery(id);
    const form = useForm<RoleDTO>({
        mode: 'uncontrolled',
        initialValues: {} as RoleDTO,
        validate: zodResolver(schema),
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
        action: id ? 'update' : 'create'
    });

    const handleSubmit = async (values: RoleDTO) => {
        const result = await mutateAsync(values);

        setActiveRoleId(result?.id);

        modals.closeAll();
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <TextInput required label="角色名称"
                           data-autofocus
                           key={form.key('name')}
                           {...form.getInputProps('name')}/>
                <Textarea
                    label="角色描述"
                    placeholder="描述角色用途"
                    autosize minRows={3} maxRows={6}
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
                <Group justify="end" mt="md">
                    <Button variant="default" onClick={() => modals.closeAll()}>取消</Button>
                    <Button type="submit" loading={isPending}>保存</Button>
                </Group>
            </Stack>
        </form>
    );
}

const RolesList = ({activeRoleId, setActiveRoleId}: {
    activeRoleId: string | undefined,
    setActiveRoleId: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 200,);
    const handleClear = () => {
        setSearchValue('');
    };

    const {data} = useRolesQuery();

    const editor = useEditor({
        entityName: '角色',
        size: 'lg',
        form: (props) => (<EditForm setActiveRoleId={setActiveRoleId} {...props}/>),
    });

    const items = data?.items ?? [];

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const roles = filteredItems?.map((roleDTO) => (
        <UnstyledButton className={classes.role} key={roleDTO.id}
                        data-active={activeRoleId === roleDTO.id || undefined}
                        onClick={(event) => {
                            event.preventDefault();
                            setActiveRoleId(roleDTO.id);
                        }}>
            <Stack gap={1} justify="space-between">
                {roleDTO.name}
                <Text size="sm">用户数: {roleDTO.userCount}</Text>
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
                <Stack gap="xs">
                    <UnstyledButton className={classes.role} key={0}
                                    onClick={() => editor.create()}>
                        <Group gap="0.4rem" justify="center">
                            <IconPlus size="1.2rem"/>
                            <Text size="sm">新建角色</Text>
                        </Group>
                    </UnstyledButton>
                    {roles}
                </Stack>
            </ScrollArea>
        </Stack>
    );
}

const UserList = () => {
    return (
        <Stack my="xs">
            <Flex justify="end" align="center" gap="sm" px="xs">
                <Button>添加</Button>
            </Flex>
        </Stack>
    );
}

const RoleDetails = ({activeRoleId, setActiveRoleId}: {
    activeRoleId: string | undefined,
    setActiveRoleId: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
    const {data: role, isLoading} = useGetRoleQuery(activeRoleId);

    const editor = useEditor({
        entityName: '角色',
        size: 'lg',
        form: (props) => (<EditForm setActiveRoleId={setActiveRoleId} {...props}/>),
    });

    if (activeRoleId === undefined) {
        return (
            <Center w="100%">
                <Text size="xl">请从左侧列表选择一个角色。</Text>
            </Center>
        );
    }

    if (isLoading) {
        return (
            <Center w="100%">
                <Loader/>
            </Center>
        );
    }

    return (
        <Stack w="100%">
            <Card withBorder shadow="xs">
                <Card.Section m="0.2rem">
                    <Group justify="space-between">
                        <Title order={4} mr="sm">{role?.name}</Title>
                        <Tooltip label="修改名称和描述">
                            <Button onClick={() => editor.edit(activeRoleId)}>编辑</Button>
                        </Tooltip>
                    </Group>
                </Card.Section>
                <Card.Section m="0.2rem">
                    <Text size="sm" c="dark">
                        <b>描述: </b>{role?.description}
                    </Text>
                </Card.Section>
            </Card>
            <Tabs defaultValue="privileges">
                <Tabs.List>
                    <Tabs.Tab value="privileges" leftSection={<IconListDetails size="1.2rem"/>}>
                        权限
                    </Tabs.Tab>
                    <Tabs.Tab value="users" leftSection={<IconUsers size="1.2rem"/>}>
                        用户
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="privileges">
                    <PrivilegeSelect/>
                </Tabs.Panel>
                <Tabs.Panel value="users">
                    <UserList/>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}

const Roles = () => {
    const [activeRoleId, setActiveRoleId] = useState<string | undefined>(undefined);


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

    return (
        <Container fluid p="sm">
            <Flex className={classes.root} gap="sm">
                <RolesList activeRoleId={activeRoleId} setActiveRoleId={setActiveRoleId}/>
                <RoleDetails activeRoleId={activeRoleId} setActiveRoleId={setActiveRoleId}/>
            </Flex>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/settings/roles/')({
    component: Roles,
})