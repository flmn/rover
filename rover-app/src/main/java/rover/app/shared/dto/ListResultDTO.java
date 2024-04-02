package rover.app.shared.dto;

import java.util.List;

public record ListResultDTO<T extends DataTransferObject>(ListResultMetaDTO meta,
                                                          List<T> records) implements DataTransferObject {
}
