package rover.app.platform.dto.system;

public record MemInfoDTO(String total,
                         String used,
                         String free,
                         int usage,
                         String usageText) {
}
