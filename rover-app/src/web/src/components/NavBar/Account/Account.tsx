import { Avatar, Group, Text } from "@mantine/core";
import { useAccountQuery } from "@/hooks";

export function Account() {
    const {data} = useAccountQuery();

    const name = data?.name ?? '用户';

    return (
        <Group>
            <Avatar radius="xl">{data?.avatar}</Avatar>
            <Text>{name}</Text>
        </Group>
    );
}