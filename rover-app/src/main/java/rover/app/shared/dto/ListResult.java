package rover.app.shared.dto;

import java.util.List;

public record ListResult<T>(long totalCount,
                            List<T> records) {
}
