package rover.app.platform.dto.server;

public record JvmInfoDTO(String name,
                         String version,
                         String vendor,
                         String vendorVersion,
                         String home,
                         String totalMemory,
                         String maxMemory,
                         String freeMemory,
                         String uptime) {
}
