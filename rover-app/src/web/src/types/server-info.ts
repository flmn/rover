export interface AppInfoDTO {
    name: string;
    version: string;
    buildTime: string;
}

export interface CpuInfoDTO {
    physicalPackages: string;
    physicalProcessors: string;
    logicalProcessor: string;
    loadAvg: string;
    cpuUsageTotal: string;
    cpuUsageUser: string;
}

export interface MemInfoDTO {
    total: string;
    used: string;
    free: string;
    usage: number;
    usageText: string;
}

export interface SysInfoDTO {
    os: string;
    arch: string;
    hostname: string;
    ipAddress: string;
    uptime: string;
    userDir: string;
}

export interface JvmInfoDTO {
    name: string;
    version: string;
    vendor: string;
    vendorVersion: string;
    home: string;
    totalMemory: string;
    maxMemory: string;
    freeMemory: string;
    uptime: string;
}

export interface DiskInfoDTO {
    name: string;
    volume: string;
    mount: string;
    fsType: string;
    total: string;
    used: string;
    free: string;
    usage: number;
    usageText: string;
}

export interface ServerInfoDTO {
    app: AppInfoDTO,
    cpu: CpuInfoDTO;
    mem: MemInfoDTO;
    sys: SysInfoDTO;
    jvm: JvmInfoDTO;
    disks: DiskInfoDTO[];
}