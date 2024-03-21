package rover.core.shared.util;

import com.github.f4b6a3.tsid.Tsid;
import com.github.f4b6a3.tsid.TsidFactory;

import java.time.Instant;

public final class IdUtils {

    private IdUtils() {
    }

    public static String newTsid() {
        Tsid tsid = TsidFactoryHolder.INSTANCE.create();

        return tsid.toLowerCase();
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
