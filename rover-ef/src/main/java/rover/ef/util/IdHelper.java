package rover.ef.util;

import com.github.f4b6a3.tsid.Tsid;
import com.github.f4b6a3.tsid.TsidFactory;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.UUID;

public final class IdHelper {

    private IdHelper() {
    }

    public static String newUuid() {
        return UUID.randomUUID().toString();
    }

    public static String newCompactUuid() {
        return newUuid().replace("-", "");
    }

    public static String newTsid() {
        Tsid tsid = TsidFactoryHolder.INSTANCE.create();

        return tsid.toLowerCase();
    }

    public static String newTsid(String prefix) {
        if (StringUtils.hasText(prefix)) {
            prefix = prefix + "-";
        } else {
            prefix = "";
        }

        return String.format("%s%s", prefix, newTsid());
    }

    private static class TsidFactoryHolder {
        static final TsidFactory INSTANCE = TsidFactory.builder()
                .withNodeBits(6)
                .withCustomEpoch(Instant.parse("2024-01-01T00:00:00.000Z"))
                .build();

        private TsidFactoryHolder() {
        }
    }
}
