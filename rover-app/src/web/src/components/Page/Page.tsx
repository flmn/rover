import { Group, Stack, Title } from "@mantine/core";

interface PageProps {
    title: string
    children: any
}

export function Page(props: PageProps) {
    return (
        <Stack justify="start" align="start" gap={0} h="100vh">
            <Group id="header" p="md" w="100%" h={60} justify="space-between">
                <Title order={3}>{props.title}</Title>
            </Group>
            <Stack p="xs" w="100%">
                {props.children}
            </Stack>
        </Stack>
    );
}