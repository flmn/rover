import { Flex, Stack, Title } from "@mantine/core";

interface PageProps {
    title: string;
    toolbar?: any;
    children: any;
}

export function Page(props: PageProps) {
    return (
        <Stack justify="start" align="start" gap={0} h="100vh">
            <Flex id="header" p="md" w="100%" h={68} justify="space-between" align="center" bg="gray.0">
                <Title order={3}>{props.title}</Title>
                {props.toolbar}
            </Flex>
            <Stack p="xs" w="100%">
                {props.children}
            </Stack>
        </Stack>
    );
}