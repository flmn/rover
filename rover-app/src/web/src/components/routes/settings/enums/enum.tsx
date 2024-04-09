import { Badge, Card, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs"
import { EnumDTO } from "@/types";

interface EnumProps {
    enumDTO: EnumDTO
}

export function Enum({enumDTO}: EnumProps) {
    return (
        <Card withBorder shadow="xs" mb="sm">
            <Card.Section m="0.4rem">
                <Group justify="space-between">
                    <Title order={4}>{enumDTO.name}</Title>
                    <Badge color="gray">{enumDTO.id}</Badge>
                </Group>
            </Card.Section>
            <Card.Section m="0.4rem">
                <Group justify="flex-end">
                    <Text size="sm" c="dimmed">
                        创建时间{dayjs(enumDTO.createdAt).format('YYYY年MM月DD日')}
                    </Text>
                </Group>
            </Card.Section>
        </Card>
    );
}