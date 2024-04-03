package rover.app.platform.dto.system;

public record SysInfoDTO(String hostname,
                         String ipAddress,
                         String osName,
                         String osArch,
                         String userDir) {
}
