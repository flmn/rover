package rover.app.shared.vo;

import java.util.List;

public record ListResultVO<T extends ViewObject>(ListResultMetaVO meta,
                                                 List<T> records) {
}
