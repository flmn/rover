import React, { useMemo, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useDebouncedValue } from "@mantine/hooks";
import { Center, Flex, ScrollArea, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.esm.mjs";
import { Page } from "@/components";
import { useEnumQuery } from "@/hooks";
import { EnumDTO, EnumMemberDTO } from "@/types";
import classes from "./index.lazy.module.css";

const EnumList = ({activeEnum, setActiveEnum}: {
    activeEnum: EnumDTO | undefined,
    setActiveEnum: React.Dispatch<React.SetStateAction<EnumDTO | undefined>>
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 200,);

    const {data} = useEnumQuery()

    const records = data?.records ?? [];

    const filteredRecords = records.filter(item =>
        item.id.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        || item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const enums = filteredRecords?.map((enumDTO) => (
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
        <Stack w={300}>
            <TextInput mx="xs"
                       leftSection={<IconSearch/>}
                       placeholder="搜索"
                       value={searchValue}
                       onChange={(event) => setSearchValue(event.target.value)}/>
            <ScrollArea scrollbars="y" mx="xs" w={280}>
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
            {
                accessorKey: 'displayOrder', //normal accessorKey
                header: '显示顺序',
            },
            {
                accessorKey: 'isDefault',
                header: '是否默认选择',
            },
        ],
        [],
    );

    const members = activeEnum?.members ?? [];

    const table = useMantineReactTable({
        columns,
        data: members,
        localization: MRT_Localization_ZH_HANS,
    });

    if (activeEnum === undefined) {
        return (
            <Center w="100%">
                <Text size="xl">请从列表选择一个字典。</Text>
            </Center>
        );
    }

    return (
        <Stack w="100%">
            <MantineReactTable table={table}/>
        </Stack>
    );
}

const Enums = () => {
    const [activeEnum, setActiveEnum] = useState<EnumDTO | undefined>(undefined);

    return (
        <Page title="数据字典管理">
            <Flex className={classes.root} gap="xs" p={0}>
                <EnumList activeEnum={activeEnum} setActiveEnum={setActiveEnum}/>
                <EnumDetails activeEnum={activeEnum}/>
            </Flex>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/enums/')({
    component: Enums,
})
