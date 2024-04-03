package rover.core.shared.util;

import java.net.InetAddress;
import java.net.UnknownHostException;

public final class IpHelper {

    private IpHelper() {
    }

    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException ignored) {
            return "未知";
        }
    }

    // todo 精细化
    public static String getHostIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException ignored) {
            return "127.0.0.1";
        }
    }
}
