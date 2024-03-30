import { Group, Stack, Title } from "@mantine/core";
import classes from "./Page.module.css";

interface PageProps {
    title: string
    children: any
}

export function Page(props: PageProps) {
    return (
        <Stack justify="start" align="start" gap={0} className={classes.stack}>
            <Group p="md" className={classes.header} justify="space-between">
                <Title order={3}>{props.title}</Title>
            </Group>
            <Stack p="xs" className={classes.content}>
                {props.children}
            </Stack>
        </Stack>
    );
}