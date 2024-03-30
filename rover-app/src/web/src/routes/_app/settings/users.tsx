import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Center, Loader, Stack } from "@mantine/core";
import { Page } from "@/components/Page";
import { DataTable } from "@/components/DataTable";
import { UserEntity } from "@/types/user.ts";
import { fetchUsers } from "@/apis/users.ts";

const Users = () => {
    const {isPending, error, data} = useQuery({queryKey: ['enums'], queryFn: fetchUsers})

    if (isPending) {
        return (
            <Page title="用户管理">
                <Stack justify="center" align="center" style={{minHeight: '100vh'}}>
                    <Center><Loader size={40}/></Center>
                </Stack>
            </Page>
        );
    }

    if (error) {
        return 'An error has occurred: ' + error.message
    }


    const columnHelper = createColumnHelper<UserEntity>()
    const columns = [
        columnHelper.accessor('id', {
            cell: info => info.getValue(),
            header: () => <span>ID</span>,
        }),
        columnHelper.accessor('email', {
            cell: info => info.getValue(),
            header: () => <span>电子邮件</span>,
        }),
        columnHelper.accessor('createdAt', {
            cell: info => info.getValue(),
            header: () => <span>创建时间</span>,
        }),
        columnHelper.accessor('updatedAt', {
            cell: info => info.getValue(),
            header: () => <span>最后更新时间</span>,
        }),
    ]

    return (
        <Page title="用户管理">
            <DataTable columns={columns} data={data}/>
        </Page>
    );
}

export const Route = createFileRoute('/_app/settings/users')({
    component: Users,
})
