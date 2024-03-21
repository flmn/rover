package rover.core.shared.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends ListPagingAndSortingRepository<T, ID>, ListCrudRepository<T, ID> {
}
