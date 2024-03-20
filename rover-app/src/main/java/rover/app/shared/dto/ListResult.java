package rover.app.shared.dto;

import java.util.List;

public class ListResult<T> {
    private long totalCount;
    private List<T> records;

    public static <T> ListResult<T> of(long totalCount, List<T> records) {
        ListResult<T> result = new ListResult<>();
        result.setTotalCount(totalCount);
        result.setRecords(records);

        return result;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }
}
