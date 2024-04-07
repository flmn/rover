import { Flex, Stack, Title } from "@mantine/core";
import classes from "./Page.module.css";

interface PageProps {
    title: string;
    toolbar?: any;
    children: any;
}

export function Page(props: PageProps) {
    return (
        <Stack justify="start" align="start" gap={0} h="100vh">
            <Flex className={classes.header} p="md" justify="space-between" align="center">
                <Title order={3}>{props.title}</Title>
                {props.toolbar}
            </Flex>
            <Stack className={classes.content} p="xs">
                {props.children}
            </Stack>
        </Stack>
    );
}