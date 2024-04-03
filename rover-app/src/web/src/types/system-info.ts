export interface CpuInfoDTO {
    physicalCpus: string;
    logicalCpus: string;
}

export interface MemoryInfoDTO {
    total: string;
    used: string;
    free: string;
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

export interface SystemInfoDTO {
    cpu: CpuInfoDTO;
    memory: MemoryInfoDTO;
    jvm: JvmInfoDTO;
    disks: DiskInfoDTO[];
}