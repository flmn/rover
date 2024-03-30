import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid } from "@mantine/core";
import { Page } from "@/components/Page";
import { Enum } from "@/components/routes/settings/enum.tsx";
import { fetchEnums } from "@/apis/enums.ts";

const Enums = () => {
    const query = useQuery({queryKey: ['enums'], queryFn: fetchEnums})
    const enums = query.data

    return (
        <Page title="数据字典管理">
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
        </Page>
    );
}

export const Route = createFileRoute('/_app/settings/enums')({
    component: Enums,
})
