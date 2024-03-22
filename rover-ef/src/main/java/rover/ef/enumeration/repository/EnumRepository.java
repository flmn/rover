package rover.ef.enumeration.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rover.ef.enumeration.entity.EnumEntity;


@Repository
public interface EnumRepository extends ListPagingAndSortingRepository<EnumEntity, String>,
        ListCrudRepository<EnumEntity, String> {
}
