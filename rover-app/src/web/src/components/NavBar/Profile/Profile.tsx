import { Avatar, Group, Text } from "@mantine/core";
import { useProfileMeQuery } from "@/hooks";

export function Profile() {
    const {data} = useProfileMeQuery();

    const name = data?.name ?? '用户';

    return (
        <Group>
            <Avatar radius="xl">{data?.avatar}</Avatar>
            <Text>{name}</Text>
        </Group>
    );
}