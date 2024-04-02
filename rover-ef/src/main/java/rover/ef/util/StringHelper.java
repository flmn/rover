package rover.ef.util;

public final class StringHelper {

    private StringHelper() {
    }

    public static String nullToEmpty(String str) {
        if (str == null) {
            return "";
        }

        return str;
    }
}
