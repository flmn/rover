import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Group, Title } from "@mantine/core";
import { Enum } from "@/components/enum.tsx";
import { fetchEnums } from "@/apis/enums.ts";

const Page = () => {
    const query = useQuery({queryKey: ['enums'], queryFn: fetchEnums})
    const enums = query.data

    return (
        <>
            <Group h={48} mb="sm" justify="space-between">
                <Title order={3}>数据字典管理</Title>
            </Group>
            <Grid>
                <Grid.Col span={3}>
                    <Container bg="grey" p="sm">
                        {enums?.map((enumEntity) => (
                            <Enum enumEntity={enumEntity} key={enumEntity.id}/>
                        ))}
                    </Container>
                </Grid.Col>
                <Grid.Col span={9}>

                </Grid.Col>
            </Grid>
        </>
    );
}

export const Route = createFileRoute('/_app/settings/enum')({
    component: Page,
})
