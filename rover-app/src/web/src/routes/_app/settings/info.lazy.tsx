import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, Grid, Progress, Stack, Table, Text, Title } from "@mantine/core";
import { CpuInfoDTO, DiskInfoDTO, JvmInfoDTO, MemoryInfoDTO } from "@/types/system-info";
import { useSystemInfoQuery } from "@/hooks/use-system-apis";
import { Page } from "@/components/Page";

const CpuInfo = ({cpuInfo}: { cpuInfo: CpuInfoDTO }) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>CPU</Title>
            </Card.Section>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>参数</Table.Th>
                        <Table.Th>值</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>物理核心数</Table.Td>
                        <Table.Td>{cpuInfo.physicalCpus}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>逻辑核心数</Table.Td>
                        <Table.Td>{cpuInfo.logicalCpus}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

const MemoryInfo = ({memoryInfo}: { memoryInfo: MemoryInfoDTO }) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>内存</Title>
            </Card.Section>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>参数</Table.Th>
                        <Table.Th>值</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>总内存</Table.Td>
                        <Table.Td>{memoryInfo.total}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>已用内存</Table.Td>
                        <Table.Td>{memoryInfo.used}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>剩余内存</Table.Td>
                        <Table.Td>{memoryInfo.free}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

const JvmInfo = ({jvmInfo}: { jvmInfo: JvmInfoDTO }) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>JVM</Title>
            </Card.Section>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>参数</Table.Th>
                        <Table.Th>值</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>版本</Table.Td>
                        <Table.Td>{jvmInfo.version}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>安装路径</Table.Td>
                        <Table.Td>{jvmInfo.home}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>最大可用内存</Table.Td>
                        <Table.Td>{jvmInfo.maxMemory}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>当前占用内存</Table.Td>
                        <Table.Td>{jvmInfo.totalMemory}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>空闲内存</Table.Td>
                        <Table.Td>{jvmInfo.freeMemory}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

const DiskInfo = ({diskInfos}: { diskInfos: DiskInfoDTO[] }) => {
    const rows = diskInfos.map((diskInfo) => (
        <Table.Tr key={diskInfo.volume}>
            <Table.Td>{diskInfo.name}</Table.Td>
            <Table.Td>{diskInfo.volume}</Table.Td>
            <Table.Td>{diskInfo.mount}</Table.Td>
            <Table.Td>{diskInfo.fsType}</Table.Td>
            <Table.Td>{diskInfo.total}</Table.Td>
            <Table.Td>{diskInfo.used}</Table.Td>
            <Table.Td>{diskInfo.free}</Table.Td>
            <Table.Td>
                <Stack gap={2}>
                    <Progress value={diskInfo.usage} color="red"/>
                    <Text>{diskInfo.usageText}</Text>
                </Stack>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>硬盘</Title>
            </Card.Section>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>名称</Table.Th>
                        <Table.Th>分区</Table.Th>
                        <Table.Th>挂载点</Table.Th>
                        <Table.Th>文件系统</Table.Th>
                        <Table.Th>总容量</Table.Th>
                        <Table.Th>已用容量</Table.Th>
                        <Table.Th>剩余容量</Table.Th>
                        <Table.Th>使用率</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Card>
    );
}

const SystemInfo = () => {
    const {data} = useSystemInfoQuery();

    const cpu = data?.cpu ?? {
        physicalCpus: 'N/A',
        logicalCpus: 'N/A',
    }
    const memory = data?.memory ?? {
        total: 'N/A',
        used: 'N/A',
        free: 'N/A',
    }
    const jvm = data?.jvm ?? {
        version: 'N/A',
        home: 'N/A',
        totalMemory: 'N/A',
        maxMemory: 'N/A',
        freeMemory: 'N/A',
    }
    const disks = data?.disks ?? []

    return (
        <Page title="系统信息">
            <Grid p="sm">
                <Grid.Col span={6}>
                    <CpuInfo cpuInfo={cpu}/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <MemoryInfo memoryInfo={memory}/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <JvmInfo jvmInfo={jvm}/>
                </Grid.Col>
                <Grid.Col span={12}>
                    <DiskInfo diskInfos={disks}/>
                </Grid.Col>
            </Grid>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/info')({
    component: SystemInfo,
})