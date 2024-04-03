import { createLazyFileRoute } from '@tanstack/react-router'
import { Button, Card, Grid, Group, Loader, Progress, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { AppInfoDTO, CpuInfoDTO, DiskInfoDTO, JvmInfoDTO, MemInfoDTO, SysInfoDTO } from "@/types/server-info";
import { useServerInfoQuery } from "@/hooks/use-server-apis";
import { Page } from "@/components/Page";

const AppInfo = ({appInfo}: { appInfo: AppInfoDTO }) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>应用程序</Title>
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
                        <Table.Td>名称</Table.Td>
                        <Table.Td>{appInfo.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>版本</Table.Td>
                        <Table.Td>{appInfo.version}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>构建时间</Table.Td>
                        <Table.Td>{appInfo.buildTime}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

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
                        <Table.Td>数量（物理/核/超线程）</Table.Td>
                        <Table.Td>{cpuInfo.physicalPackages} / {cpuInfo.physicalProcessors} / {cpuInfo.logicalProcessor}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>平均负载</Table.Td>
                        <Table.Td>{cpuInfo.loadAvg}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>CPU 总使用率</Table.Td>
                        <Table.Td>{cpuInfo.cpuUsageTotal}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>CPU 用户使用率</Table.Td>
                        <Table.Td>{cpuInfo.cpuUsageUser}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

const MemInfo = ({memInfo}: { memInfo: MemInfoDTO }) => {
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
                        <Table.Td>{memInfo.total}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>已用内存</Table.Td>
                        <Table.Td>{memInfo.used}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>剩余内存</Table.Td>
                        <Table.Td>{memInfo.free}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>使用率</Table.Td>
                        <Table.Td>
                            <Group gap="md" grow>
                                {memInfo.usage && <Progress value={memInfo.usage}/>}
                                <Text size="sm">{memInfo.usageText}</Text>
                            </Group>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
}

const SysInfo = ({sysInfo}: { sysInfo: SysInfoDTO }) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section inheritPadding py="md">
                <Title order={4}>服务器</Title>
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
                        <Table.Td>操作系统</Table.Td>
                        <Table.Td>{sysInfo.os}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>系统架构</Table.Td>
                        <Table.Td>{sysInfo.arch}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>主机名</Table.Td>
                        <Table.Td>{sysInfo.hostname}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>IP</Table.Td>
                        <Table.Td>{sysInfo.ipAddress}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>运行时间</Table.Td>
                        <Table.Td>{sysInfo.uptime}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>运行目录</Table.Td>
                        <Table.Td>{sysInfo.userDir}</Table.Td>
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
                        <Table.Td>JDK</Table.Td>
                        <Table.Td>{jvmInfo.name}{' '}{jvmInfo.version}{' '}({jvmInfo.vendor}{' '}{jvmInfo.vendorVersion})</Table.Td>
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
                    <Table.Tr>
                        <Table.Td>运行时间</Table.Td>
                        <Table.Td>{jvmInfo.uptime}</Table.Td>
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
                    <Text size="sm">{diskInfo.usageText}</Text>
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

const ServerInfo = () => {
    const {data, isFetching, refetch} = useServerInfoQuery();

    const app = data?.app ?? {} as AppInfoDTO;
    const cpu = data?.cpu ?? {} as CpuInfoDTO;
    const mem = data?.mem ?? {} as MemInfoDTO;
    const sys = data?.sys ?? {} as SysInfoDTO;
    const jvm = data?.jvm ?? {} as JvmInfoDTO;
    const disks = data?.disks ?? [];

    return (
        <Page title="系统信息" toolbar={
            <Group>
                {isFetching && <Loader size="sm"/>}
                <Tooltip label="创建一个新用户">
                    <Button onClick={() => refetch()}>刷新</Button>
                </Tooltip>
            </Group>}>
            <Grid p="sm">
                <Grid.Col span={6}>
                    <AppInfo appInfo={app}/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <MemInfo memInfo={mem}/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <CpuInfo cpuInfo={cpu}/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <SysInfo sysInfo={sys}/>
                </Grid.Col>
                <Grid.Col span={12}>
                    <JvmInfo jvmInfo={jvm}/>
                </Grid.Col>
                <Grid.Col span={12}>
                    <DiskInfo diskInfos={disks}/>
                </Grid.Col>
            </Grid>
        </Page>
    );
}

export const Route = createLazyFileRoute('/_app/settings/server-info')({
    component: ServerInfo,
})