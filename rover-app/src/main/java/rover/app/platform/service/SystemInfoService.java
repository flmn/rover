package rover.app.platform.service;

import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;
import rover.app.platform.dto.system.*;
import rover.core.shared.util.NumberHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class SystemInfoService {

    public SystemInfoDTO getSystemInfo() {
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();

        return new SystemInfoDTO(getCpuInfo(hal),
                getMemoryInfo(hal),
                getJvmInfo(),
                getDiskInfos(os));
    }

    private CpuInfoDTO getCpuInfo(HardwareAbstractionLayer hal) {
        CentralProcessor cpu = hal.getProcessor();

        return new CpuInfoDTO(cpu.getPhysicalProcessorCount(),
                cpu.getLogicalProcessorCount());
    }

    private MemoryInfoDTO getMemoryInfo(HardwareAbstractionLayer hal) {
        GlobalMemory memory = hal.getMemory();

        String total = NumberHelper.sizeText(memory.getTotal());
        String used = NumberHelper.sizeText(memory.getTotal() - memory.getAvailable());
        String free = NumberHelper.sizeText(memory.getAvailable());

        return new MemoryInfoDTO(total,
                used,
                free);
    }

    private List<DiskInfoDTO> getDiskInfos(OperatingSystem os) {
        FileSystem fileSystem = os.getFileSystem();
        List<OSFileStore> fss = fileSystem.getFileStores();
        List<DiskInfoDTO> diskInfos = new ArrayList<>(fss.size());

        for (OSFileStore fs : fss) {
            long total = fs.getTotalSpace();
            long free = fs.getUsableSpace();
            long used = total - free;

            DiskInfoDTO di = new DiskInfoDTO(fs.getName(),
                    fs.getVolume(),
                    fs.getMount(),
                    fs.getType(),
                    NumberHelper.sizeText(total),
                    NumberHelper.sizeText(used),
                    NumberHelper.sizeText(free),
                    (int) (used * 100 / total),
                    NumberHelper.percent(used, total, 2));

            diskInfos.add(di);
        }

        return diskInfos;
    }

    private JvmInfoDTO getJvmInfo() {
        Properties props = System.getProperties();
        Runtime runtime = Runtime.getRuntime();

        String totalMemory = NumberHelper.sizeText(runtime.totalMemory());
        String maxMemory = NumberHelper.sizeText(runtime.maxMemory());
        String freeMemory = NumberHelper.sizeText(runtime.freeMemory());

        return new JvmInfoDTO(props.getProperty("java.version"),
                props.getProperty("java.home"),
                totalMemory,
                maxMemory,
                freeMemory);
    }
}
