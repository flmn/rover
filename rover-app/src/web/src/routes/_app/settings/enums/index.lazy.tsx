import { useMemo } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useDebouncedState } from "@mantine/hooks";
import { Flex, ScrollArea, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.esm.mjs";
import { useEnumQuery } from "@/hooks/use-enum-apis";
import { EnumMemberDTO } from "@/types/enum";
import { Page } from "@/components/Page";
import { Enum } from "@/components/routes/settings/enums/enum";
import classes from "./index.lazy.module.css";

const EnumList = () => {
    const [searchValue, setSearchValue] = useDebouncedState('', 200);
    const {data} = useEnumQuery()

    const records = data?.records ?? [];

    const enums = records?.map((enumDTO) => (
        <Enum enumDTO={enumDTO} key={enumDTO.id}/>
    ));

    return (
        <Stack>
            <TextInput mx="xs"
                       leftSection={<IconSearch/>}
                       placeholder="搜索"
                       value={searchValue}
                       onChange={(event) => setSearchValue(event.target.value)}/>
            <ScrollArea scrollbars="y" px="sm">
                {enums}
            </ScrollArea>
        </Stack>

    );
}

const MemberList = ({members}: { members: EnumMemberDTO[] }) => {
    const columns = useMemo<MRT_ColumnDef<EnumMemberDTO>[]>(
        () => [
            {
                accessorKey: 'label', //access nested data with dot notation
                header: '标签',
            },
            {
                accessorKey: 'value',
                header: '值',
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

    const table = useMantineReactTable({
        columns,
        data: members,
        localization: MRT_Localization_ZH_HANS,
    });

    return (
        <Stack w="100%">
            <MantineReactTable table={table}/>
        </Stack>
    );
}

const Enums = () => {

    return (
        <Page title="数据字典管理">
            <Flex className={classes.root} gap="xs" p={0}>
                <EnumList/>
                <MemberList members={[]}/>
            </Flex>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/enums/')({
    component: Enums,
})
