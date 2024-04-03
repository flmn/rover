package rover.app.platform.dto.system;

public record JvmInfoDTO(String version,
                         String home,
                         String totalMemory,
                         String maxMemory,
                         String freeMemory) {
}
