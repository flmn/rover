package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.FileEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface FileRepository extends BaseRepository<FileEntity, String> {
}
