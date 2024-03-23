import { Badge, Card } from "@mantine/core";

interface EnumProps {
    data: any
}

export function Enum({data}: EnumProps) {
    return (
        <Card withBorder shadow="xs" my="xl">
            <Badge color="grey">{data.id}</Badge>
            {data.name}
        </Card>
    );
}