package rover.app.platform.dto.system;

public record SysInfoDTO(String os,
                         String arch,
                         String hostname,
                         String ipAddress,
                         String uptime,
                         String userDir) {
}
