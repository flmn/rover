package rover.core.platform.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rover.core.platform.entity.EnumEntity;


@Repository
public interface EnumRepository extends ListPagingAndSortingRepository<EnumEntity, String>,
        ListCrudRepository<EnumEntity, String> {
}
