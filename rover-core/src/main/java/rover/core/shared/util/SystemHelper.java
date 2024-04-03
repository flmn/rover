package rover.core.shared.util;

public final class SystemHelper {

    private SystemHelper() {
    }

    public static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException ignored) {
        }
    }
}
