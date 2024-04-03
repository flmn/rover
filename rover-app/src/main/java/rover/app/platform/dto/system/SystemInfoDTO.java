package rover.app.platform.dto.system;

import java.util.List;

public record SystemInfoDTO(CpuInfoDTO cpu,
                            MemoryInfoDTO memory,
                            JvmInfoDTO jvm,
                            List<DiskInfoDTO> disks) {
}
