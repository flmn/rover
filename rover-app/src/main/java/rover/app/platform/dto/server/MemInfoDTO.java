package rover.app.platform.dto.server;

public record MemInfoDTO(String total,
                         String used,
                         String free,
                         int usage,
                         String usageText) {
}
