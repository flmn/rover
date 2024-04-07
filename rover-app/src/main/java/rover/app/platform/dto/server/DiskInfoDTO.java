package rover.app.platform.dto.server;

public record DiskInfoDTO(String name,
                          String volume,
                          String mount,
                          String fsType,
                          String total,
                          String used,
                          String free,
                          int usage,
                          String usageText,
                          boolean usageAlarm) {
}
