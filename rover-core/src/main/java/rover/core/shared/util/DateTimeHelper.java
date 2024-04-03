package rover.core.shared.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public final class DateTimeHelper {
    public static final ZoneId CST = ZoneId.of("Asia/Shanghai");
    public static final ZoneId UTC = ZoneOffset.UTC;
    public static final DateTimeFormatter SIMPLE_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private DateTimeHelper() {
    }

    public static String toString(Instant instant) {
        LocalDateTime ldt = LocalDateTime.ofInstant(instant, CST);

        return SIMPLE_DATE_TIME_FORMATTER.format(ldt);
    }
}
