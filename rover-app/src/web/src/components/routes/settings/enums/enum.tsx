import { Badge, Card, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs"
import { EnumVO } from "@/types/enum.ts";

interface EnumProps {
    enumVO: EnumVO
}

export function Enum({enumVO}: EnumProps) {
    return (
        <Card withBorder shadow="xs" my="sm">
            <Card.Section m="0.4rem">
                <Group justify="space-between">
                    <Title order={4}>{enumVO.name}</Title>
                    <Badge color="grey">{enumVO.id}</Badge>
                </Group>
            </Card.Section>
            <Card.Section m="0.4rem">
                <Group justify="flex-end">
                    <Text size="sm" c="dimmed">
                        创建时间{dayjs(enumVO.createdAt).format('YYYY年MM月DD日')}
                    </Text>
                </Group>
            </Card.Section>
        </Card>
    );
}