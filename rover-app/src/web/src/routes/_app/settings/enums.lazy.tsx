import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Grid } from "@mantine/core";
import { Page } from "@/components/Page";
import { Enum } from "@/components/routes/settings/enums/enum";
import { useFetchEnums } from "@/hooks/use-fetch-enums.ts";

const Enums = () => {
    const {data} = useFetchEnums()

    const records = data?.records ?? [];

    return (
        <Page title="数据字典管理">
            <Grid>
                <Grid.Col span={3}>
                    <Container bg="grey" p="sm">
                        {records?.map((enumDTO) => (
                            <Enum enumDTO={enumDTO} key={enumDTO.id}/>
                        ))}
                    </Container>
                </Grid.Col>
                <Grid.Col span={9}>

                </Grid.Col>
            </Grid>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/enums')({
    component: Enums,
})
