package rover.ef.enumeration.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rover.ef.enumeration.entity.EnumMemberEntity;

@Repository
public interface EnumMemberRepository extends ListPagingAndSortingRepository<EnumMemberEntity, String>,
        ListCrudRepository<EnumMemberEntity, String> {
}
