package rover.app.platform.dto.system;

public record CpuInfoDTO(int physicalPackages,
                         int physicalProcessors,
                         int logicalProcessor,
                         String loadAvg,
                         String cpuUsageTotal,
                         String cpuUsageUser) {
}
