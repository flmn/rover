package rover.app.platform.dto.system;

public record DiskInfoDTO(String name,
                          String volume,
                          String mount,
                          String fsType,
                          String total,
                          String used,
                          String free,
                          String usage) {
}
