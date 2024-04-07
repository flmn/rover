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
import oshi.util.Util;
import rover.app.platform.dto.server.*;
import rover.core.platform.service.ConfigService;
import rover.core.shared.constant.SysConfigs;
import rover.core.shared.util.DateTimeHelper;
import rover.core.shared.util.IpHelper;
import rover.core.shared.util.NumberHelper;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.StringJoiner;

@Service
public class ServerInfoService {
    private static final int OSHI_WAIT_SECOND = 1000;
    private final BuildProperties buildProperties;
    private final ConfigService configService;

    public ServerInfoService(BuildProperties buildProperties,
                             ConfigService configService) {
        this.buildProperties = buildProperties;
        this.configService = configService;
    }

    public ServerInfoDTO getServerInfo() {
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();

        return new ServerInfoDTO(getAppInfo(),
                getCpuInfo(hal),
                getMemoryInfo(hal),
                getSysInfo(os),
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

        // load
        double[] loadAverage = cpu.getSystemLoadAverage(3);
        StringJoiner sj = new StringJoiner(", ");
        for (double load : loadAverage) {
            sj.add(load < 0 ? "N/A" : String.format("%.2f", load));
        }
        String loadAvg = sj.toString();

        // usage
        long[] prevTicks = cpu.getSystemCpuLoadTicks();
        Util.sleep(OSHI_WAIT_SECOND);
        long[] ticks = cpu.getSystemCpuLoadTicks();
        long total = 0;
        for (int i = 0; i < ticks.length; i++) {
            total += ticks[i] - prevTicks[i];
        }

        long user = ticks[CentralProcessor.TickType.USER.getIndex()] - prevTicks[CentralProcessor.TickType.USER.getIndex()];
        long idle = ticks[CentralProcessor.TickType.IDLE.getIndex()] + ticks[CentralProcessor.TickType.IOWAIT.getIndex()]
                - prevTicks[CentralProcessor.TickType.IDLE.getIndex()] - prevTicks[CentralProcessor.TickType.IOWAIT.getIndex()];

        return new CpuInfoDTO(cpu.getPhysicalPackageCount(),
                cpu.getPhysicalProcessorCount(),
                cpu.getLogicalProcessorCount(),
                loadAvg,
                NumberHelper.percent(total - idle, total, 2),
                NumberHelper.percent(user, total, 2));
    }

    private MemInfoDTO getMemoryInfo(HardwareAbstractionLayer hal) {
        int alarm = configService.getInteger(SysConfigs.SERVER_ALARM_MEMORY, 100);
        GlobalMemory memory = hal.getMemory();

        long total = memory.getTotal();
        long free = memory.getAvailable();
        long used = total - free;
        int usage = (int) (used * 100 / total);

        return new MemInfoDTO(NumberHelper.sizeText(total),
                NumberHelper.sizeText(used),
                NumberHelper.sizeText(free),
                usage,
                NumberHelper.percent(used, total, 2),
                usage > alarm);
    }

    private SysInfoDTO getSysInfo(OperatingSystem os) {
        Properties props = System.getProperties();
        Duration uptime = Duration.ofSeconds(os.getSystemUptime());

        return new SysInfoDTO(os.toString(),
                props.getProperty("os.arch"),
                IpHelper.getHostName(),
                IpHelper.getHostIp(),
                DateTimeHelper.toString(uptime),
                props.getProperty("user.dir"));
    }

    private JvmInfoDTO getJvmInfo() {
        Properties props = System.getProperties();
        Runtime runtime = Runtime.getRuntime();
        String totalMemory = NumberHelper.sizeText(runtime.totalMemory());
        String maxMemory = NumberHelper.sizeText(runtime.maxMemory());
        String freeMemory = NumberHelper.sizeText(runtime.freeMemory());

        RuntimeMXBean mx = ManagementFactory.getRuntimeMXBean();
        Duration uptime = Duration.ofMillis(mx.getUptime());

        return new JvmInfoDTO(props.getProperty("java.vm.name"),
                props.getProperty("java.vm.version"),
                props.getProperty("java.vm.vendor"),
                props.getProperty("java.vendor.version"),
                props.getProperty("java.home"),
                totalMemory,
                maxMemory,
                freeMemory,
                DateTimeHelper.toString(uptime));
    }

    private List<DiskInfoDTO> getDiskInfos(OperatingSystem os) {
        int alarm = configService.getInteger(SysConfigs.SERVER_ALARM_DISK, 100);
        FileSystem fileSystem = os.getFileSystem();
        List<OSFileStore> fss = fileSystem.getFileStores();
        List<DiskInfoDTO> diskInfos = new ArrayList<>(fss.size());

        for (OSFileStore fs : fss) {
            long total = fs.getTotalSpace();
            long free = fs.getUsableSpace();
            long used = total - free;
            int usage = (int) (used * 100 / total);

            DiskInfoDTO di = new DiskInfoDTO(fs.getName(),
                    fs.getVolume(),
                    fs.getMount(),
                    fs.getType(),
                    NumberHelper.sizeText(total),
                    NumberHelper.sizeText(used),
                    NumberHelper.sizeText(free),
                    usage,
                    NumberHelper.percent(used, total, 2),
                    usage > alarm);

            diskInfos.add(di);
        }

        return diskInfos;
    }
}
