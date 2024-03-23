import { Badge, Card, Group, Text, Title } from "@mantine/core";
import { EnumEntity } from "@/apis/enums.ts";
import dayjs from "dayjs"

interface EnumProps {
    enumEntity: EnumEntity
}

export function Enum({enumEntity}: EnumProps) {
    return (
        <Card withBorder shadow="xs" my="sm">
            <Card.Section m="0.4rem">
                <Group justify="space-between">
                    <Title order={4}>{enumEntity.name}</Title>
                    <Badge color="grey">{enumEntity.id}</Badge>
                </Group>
            </Card.Section>
            <Card.Section m="0.4rem">
                <Group justify="flex-end">
                    <Text size="sm" c="dimmed">
                        创建时间{dayjs(enumEntity.createdAt).format('YYYY年MM月DD日')}
                    </Text>
                </Group>
            </Card.Section>
        </Card>
    );
}