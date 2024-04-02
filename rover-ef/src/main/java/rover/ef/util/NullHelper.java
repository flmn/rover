package rover.ef.util;

public final class NullHelper {

    private NullHelper() {
    }

    public static String nullToEmpty(String str) {
        if (str == null) {
            return "";
        }

        return str;
    }

    public static boolean nullToFalse(Boolean b) {
        if (b == null) {
            return false;
        }

        return b;
    }
}
