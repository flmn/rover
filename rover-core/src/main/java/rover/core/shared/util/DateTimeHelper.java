package rover.core.shared.util;

import java.time.*;
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

    public static String toString(Duration duration) {
        long days = duration.toDaysPart();
        long hours = duration.toHoursPart();
        long minutes = duration.toMinutesPart();
        long seconds = duration.toSecondsPart();

        String result = "";
        if (days > 0) {
            result = result + String.format("%d天", days);
        }
        if (hours > 0) {
            result = result + String.format("%d小时", hours);
        }
        if (minutes > 0) {
            result = result + String.format("%d分", minutes);
        }

        return result + String.format("%d秒", seconds);
    }
}
