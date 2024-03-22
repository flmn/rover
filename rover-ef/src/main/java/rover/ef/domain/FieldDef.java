package rover.ef.domain;

public record FieldDef(String name,
                       String column,
                       DataType type,
                       int length,
                       int precision,
                       String defaultValue,
                       boolean isPrimary,
                       boolean isUnique,
                       int displayOrder) {
}
