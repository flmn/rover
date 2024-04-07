package rover.app.platform.dto.server;

public record CpuInfoDTO(int physicalPackages,
                         int physicalProcessors,
                         int logicalProcessor,
                         String loadAvg,
                         String cpuUsageTotal,
                         String cpuUsageUser) {
}
