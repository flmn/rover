export interface AppInfoDTO {
    name: string;
    version: string;
    buildTime: string;
}

export interface CpuInfoDTO {
    physicalCpus: string;
    logicalCpus: string;
}

export interface MemInfoDTO {
    total: string;
    used: string;
    free: string;
    usage: number;
    usageText: string;
}

export interface SysInfoDTO {
    hostname: string;
    ipAddress: string;
    osName: string;
    osArch: string;
    userDir: string;
}

export interface JvmInfoDTO {
    version: string;
    home: string;
    totalMemory: string;
    maxMemory: string;
    freeMemory: string;
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