import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useDebouncedValue } from "@mantine/hooks";
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Code,
    Container,
    CopyButton,
    Flex,
    Group,
    ScrollArea,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
    UnstyledButton
} from "@mantine/core";
import { IconCheck, IconCopy, IconPencil, IconSearch, IconTrash, IconX } from "@tabler/icons-react";
import {
    MantineReactTable,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableOptions,
    MRT_ToggleFullScreenButton
} from "mantine-react-table";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import { Toolbar } from "@/components";
import { useDataTable, useEnumMembersMutation, useEnumQuery } from "@/hooks";
import { EnumDTO, EnumMemberDTO } from "@/types";
import classes from "./index.lazy.module.css";

const EnumList = ({activeEnum, setActiveEnum}: {
    activeEnum: EnumDTO | undefined,
    setActiveEnum: React.Dispatch<React.SetStateAction<EnumDTO | undefined>>
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 200,);
    const handleClear = () => {
        setSearchValue('');
    };

    const {data} = useEnumQuery()

    const items = data?.items ?? [];

    const filteredItems = items.filter(item =>
        item.id.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        || item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const enums = filteredItems?.map((enumDTO) => (
        <UnstyledButton className={classes.enum} key={enumDTO.id}
                        data-active={activeEnum === enumDTO || undefined}
                        onClick={(event) => {
                            event.preventDefault();
                            setActiveEnum(enumDTO);
                        }}>
            <Stack gap={1} justify="space-between">
                <Text size="sm">{enumDTO.id}</Text>
                {enumDTO.name}
            </Stack>
        </UnstyledButton>
    ));

    return (
        <Stack w={300} pr="sm" className={classes.enumList}>
            <TextInput placeholder="搜索字典" value={searchValue}
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
                    {enums}
                </Stack>
            </ScrollArea>
        </Stack>

    );
}

const EnumDetails = ({activeEnum}: {
    activeEnum: EnumDTO | undefined
}) => {
    const columns = useMemo<MRT_ColumnDef<EnumMemberDTO>[]>(
        () => [
            {
                accessorKey: 'value',
                header: '值',
            },
            {
                accessorKey: 'label', //access nested data with dot notation
                header: '标签',
            },
            // {
            //     accessorKey: 'isDefault',
            //     header: '是否默认选择',
            //     size: 80,
            //     Cell: ({cell}) => (cell.getValue<boolean>() &&
            //         <Badge size="lg">是</Badge>),
            // },
        ], []);

    const [records, setRecords] = useState<EnumMemberDTO[]>([]);
    const [dirty, setDirty] = useState(false);

    const handleCreateRow: MRT_TableOptions<EnumMemberDTO>['onCreatingRowSave'] = async ({
                                                                                             table,
                                                                                             values,
                                                                                         }) => {
        records.splice(0, 0, values,);
        setRecords([...records]);
        setDirty(true);
        table.setCreatingRow(null);
    };

    const handleSaveRow: MRT_TableOptions<EnumMemberDTO>['onEditingRowSave'] = async ({
                                                                                          table,
                                                                                          row,
                                                                                          values,
                                                                                      }) => {
        records[row.index] = values;
        setRecords([...records]);
        setDirty(true);
        table.setEditingRow(null); //exit editing mode
    };

    const openDeleteConfirmModal = (row: MRT_Row<EnumMemberDTO>) => {
        modals.openConfirmModal({
            title: '确认',
            children: <Text>确定删除条目【{row.original.label}】？删除后不可恢复。</Text>,
            labels: {confirm: '删除', cancel: '取消'},
            confirmProps: {color: 'red'},
            onConfirm: () => {
                records.splice(row.index, 1);
                setRecords([...records]);
                setDirty(true);
            },
        });
    }

    const queryClient = useQueryClient();
    const {mutateAsync: updateMembers, isPending: isUpdatingMembers} = useEnumMembersMutation({queryClient});

    const handleSaveAll = async () => {
        const enumDTO = {
            id: activeEnum?.id,
            members: records,
        } as EnumDTO;

        await updateMembers(enumDTO);

        setDirty(false);
    }

    const table = useDataTable({
        columns,
        data: records,
        // display
        enableEditing: true,
        enableHiding: false,
        enableRowOrdering: true,
        enableSorting: false,
        createDisplayMode: 'row',
        editDisplayMode: 'row',
        mantineSearchTextInputProps: {
            placeholder: '搜索字典成员',
            variant: 'default',
            w: '300',
        },
        mantineRowDragHandleProps: {
            onDragEnd: () => {
                const {draggingRow, hoveredRow} = table.getState();
                if (hoveredRow && draggingRow) {
                    records.splice(
                        (hoveredRow as MRT_Row<EnumMemberDTO>).index,
                        0,
                        records.splice(draggingRow.index, 1)[0],
                    );
                    setRecords([...records]);
                    setDirty(true);
                }
            },
        },
        // toolbar
        renderToolbarInternalActions: ({table}) => (
            <Flex gap="xs" align="center">
                <Button variant="filled" onClick={() => {
                    table.setCreatingRow(true)
                }}>
                    添加
                </Button>
                <Space w="md"/>
                <Button variant="default" disabled={!dirty} onClick={handleReset}>
                    重置
                </Button>
                <Button variant="filled" disabled={!dirty} onClick={handleSaveAll}>
                    保存
                </Button>
                <Space w="md"/>
                <MRT_ToggleFullScreenButton table={table}/>
            </Flex>
        ),
        // row actions
        renderRowActions: ({row, table}) => (
            <Flex gap="md">
                <Tooltip label="修改条目">
                    <ActionIcon variant="subtle" onClick={() => table.setEditingRow(row)}>
                        <IconPencil size="1.3rem"/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="删除条目">
                    <ActionIcon variant="subtle" color="red" onClick={() => openDeleteConfirmModal(row)}>
                        <IconTrash size="1.3rem"/>
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderBottomToolbarCustomActions: () => (
            <Group mih={56}>
                <Text pl="xs">条目数量：{records.length}</Text>
            </Group>

        ),
        // state
        state: {
            isSaving: isUpdatingMembers,
        },
        // callback
        onCreatingRowSave: handleCreateRow,
        onEditingRowSave: handleSaveRow,
    });

    const handleReset = useCallback(() => {
        setRecords([...activeEnum?.members ?? []]);
        setDirty(false);

        //exit editing mode
        table.setCreatingRow(null);
        table.setEditingRow(null);
    }, [activeEnum, table]);

    useEffect(() => {
        handleReset();
    }, [handleReset]);

    if (activeEnum === undefined) {
        return (
            <Center w="100%">
                <Text size="xl">请从左侧列表选择一个字典。</Text>
            </Center>
        );
    }

    return (
        <Stack w="100%">
            <Card withBorder shadow="xs">
                <Card.Section m="0.4rem">
                    <Group gap={0}>
                        <Title order={4} mr="sm">{activeEnum.name}</Title>
                        <Code>{activeEnum.id}</Code>
                        <CopyButton value={activeEnum.id} timeout={3000}>
                            {({copied, copy}) => (
                                <Tooltip label={copied ? '已复制' : '复制'} withArrow position="right">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? (
                                            <IconCheck size="1.2rem"/>
                                        ) : (
                                            <IconCopy size="1.2rem"/>
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                </Card.Section>
                <Card.Section m="0.4rem">
                    <Group gap="md">
                        <Text size="sm" c="dark">
                            <b>创建时间: </b>{dayjs(activeEnum.createdAt).format('YYYY年MM月DD日 HH:mm')}
                        </Text>
                        <Text size="sm" c="dark">
                            <b>最后更新时间: </b>{dayjs(activeEnum.updatedAt).format('YYYY年MM月DD日 HH:mm')}
                        </Text>
                    </Group>
                </Card.Section>
                <Card.Section m="0.4rem">
                    <Text size="sm" c="dark">
                        <b>描述: </b>{activeEnum.description}
                    </Text>
                </Card.Section>
            </Card>
            <MantineReactTable table={table}/>
        </Stack>
    )
        ;
}

const Enums = () => {
    const [activeEnum, setActiveEnum] = useState<EnumDTO | undefined>(undefined);

    return (
        <Container fluid p="sm">
            <Toolbar>
                <Tooltip label="导出系统参数">
                    <Button>全部导出</Button>
                </Tooltip>
            </Toolbar>
            <Flex className={classes.root} gap="sm">
                <EnumList activeEnum={activeEnum} setActiveEnum={setActiveEnum}/>
                <EnumDetails activeEnum={activeEnum}/>
            </Flex>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/settings/enums/')({
    component: Enums,
})
