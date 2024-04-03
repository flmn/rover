package rover.core.shared.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class NumberHelper {
    public static final long KB = 1024;
    public static final BigDecimal KB_BIGDECIMAL = BigDecimal.valueOf(KB);
    public static final long MB = KB * 1024;
    public static final BigDecimal MB_BIGDECIMAL = BigDecimal.valueOf(MB);
    public static final long GB = MB * 1024;
    public static final BigDecimal GB_BIGDECIMAL = BigDecimal.valueOf(GB);
    public static final long TB = GB * 1024;
    public static final BigDecimal TB_BIGDECIMAL = BigDecimal.valueOf(TB);

    private NumberHelper() {
    }

    public static String percent(long part, long total, int scale) {
        if (total == 0) {
            return "0%";
        }

        return BigDecimal.valueOf(part * 100)
                .divide(BigDecimal.valueOf(total), scale, RoundingMode.HALF_UP)
//                .stripTrailingZeros()
                .toPlainString() + "%";
    }

    public static String sizeText(long size) {
        if (size == 0) {
            return "0B";
        }

        BigDecimal d = BigDecimal.valueOf(size);

        if (size < KB) {
            return String.format("%dB", size);
        } else if (size < MB) {
            return d.divide(KB_BIGDECIMAL, 2, RoundingMode.HALF_UP)
                    .stripTrailingZeros()
                    .toPlainString() + "KB";
        } else if (size < GB) {
            return d.divide(MB_BIGDECIMAL, 2, RoundingMode.HALF_UP)
                    .stripTrailingZeros()
                    .toPlainString() + "MB";
        } else if (size < TB) {
            return d.divide(GB_BIGDECIMAL, 2, RoundingMode.HALF_UP)
                    .stripTrailingZeros()
                    .toPlainString() + "GB";
        } else {
            return d.divide(TB_BIGDECIMAL, 2, RoundingMode.HALF_UP)
                    .stripTrailingZeros().
                    toPlainString() + "TB";
        }
    }
}
