package rover.ef.domain;

public enum DataType {
    INTEGER(1),
    NUMERIC(2),
    CURRENCY(3),
    PERCENT(4),
    BOOLEAN(5),

    STRING_SHORT(10),
    STRING_LONG(11),
    TEXT(12),
    MOBILE(13),
    EMAIL(14),
    URL(15),
    PHONE(16),

    DATE(20),
    TIME(21),
    DATETIME(22),
    TIMESTAMP(23),
    PERIOD(24),
    DURATION(25),

    REF(30);

    private final int value;

    DataType(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
