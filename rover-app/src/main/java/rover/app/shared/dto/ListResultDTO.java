package rover.app.shared.dto;

import java.util.List;

public record ListResultDTO<T extends DataTransferObject>(int pageNumber,
                                                          int pageSize,
                                                          long total,
                                                          List<T> items) implements DataTransferObject {
}
