package rover.app.platform.dto.server;

public record SysInfoDTO(String os,
                         String arch,
                         String hostname,
                         String ipAddress,
                         String uptime,
                         String userDir) {
}
