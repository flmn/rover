package rover.core.shared.repository;

import org.springframework.data.relational.core.query.Criteria;
import org.springframework.util.StringUtils;

public final class MoreCriteria {
    public static <T extends CharSequence> Criteria like(String column, T obj) {
        return !StringUtils.hasText(obj) ? Criteria.empty() : Criteria.where(column).like("%" + obj + "%");
    }
}
