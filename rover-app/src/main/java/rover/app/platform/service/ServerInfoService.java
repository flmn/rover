package rover.app.platform.service;

import org.springframework.boot.info.BuildProperties;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;
import rover.app.platform.dto.system.*;
import rover.core.shared.util.DateTimeHelper;
import rover.core.shared.util.IpHelper;
import rover.core.shared.util.NumberHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class ServerInfoService {
    private final BuildProperties buildProperties;

    public ServerInfoService(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    public ServerInfoDTO getServerInfo() {
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();

        return new ServerInfoDTO(getAppInfo(),
                getCpuInfo(hal),
                getMemoryInfo(hal),
                getSysInfo(),
                getJvmInfo(),
                getDiskInfos(os));
    }

    private AppInfoDTO getAppInfo() {
        return new AppInfoDTO(buildProperties.getName(),
                buildProperties.getVersion(),
                DateTimeHelper.toString(buildProperties.getTime()));
    }

    private CpuInfoDTO getCpuInfo(HardwareAbstractionLayer hal) {
        CentralProcessor cpu = hal.getProcessor();

        return new CpuInfoDTO(cpu.getPhysicalProcessorCount(),
                cpu.getLogicalProcessorCount());
    }

    private MemInfoDTO getMemoryInfo(HardwareAbstractionLayer hal) {
        GlobalMemory memory = hal.getMemory();

        long total = memory.getTotal();
        long free = memory.getAvailable();
        long used = total - free;

        return new MemInfoDTO(NumberHelper.sizeText(total),
                NumberHelper.sizeText(used),
                NumberHelper.sizeText(free),
                (int) (used * 100 / total),
                NumberHelper.percent(used, total, 2));
    }

    private SysInfoDTO getSysInfo() {
        Properties props = System.getProperties();

        return new SysInfoDTO(IpHelper.getHostName(),
                IpHelper.getHostIp(),
                props.getProperty("os.name"),
                props.getProperty("os.arch"),
                props.getProperty("user.dir"));
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
