package rover.app.platform.dto.server;

import java.util.List;

public record ServerInfoDTO(AppInfoDTO app,
                            CpuInfoDTO cpu,
                            MemInfoDTO mem,
                            SysInfoDTO sys,
                            JvmInfoDTO jvm,
                            List<DiskInfoDTO> disks) {
}
