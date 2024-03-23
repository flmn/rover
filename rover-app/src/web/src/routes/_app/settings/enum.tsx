import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Title } from "@mantine/core";
import { Enum } from "@/components/enum.tsx";
import { fetchEnums } from "@/apis/enums.ts";

const enumsQueryOptions = queryOptions({
    queryKey: ['enums'],
    queryFn: () => fetchEnums(),
})

const Page = () => {
    const enumsQuery = useSuspenseQuery(enumsQueryOptions)
    const enums = enumsQuery.data

    return (
        <div>
            <Title order={4}>数据字典管理</Title>
            <div>
                {enums.map((e) => (
                    <Enum data={e} key={e.id}/>
                ))}
            </div>
        </div>
    );
}

export const Route = createFileRoute('/_app/settings/enum')({
    component: Page,
    loader: ({context}) => context.queryClient.ensureQueryData(enumsQueryOptions),
})
