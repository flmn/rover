package rover.core.platform.service;

import org.springframework.stereotype.Service;
import rover.core.platform.repository.FileRepository;

@Service
public class FileService {
    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
}
