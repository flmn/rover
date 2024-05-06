package rover.core.features.data.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.core.features.data.entity.AirportEntity;
import rover.core.features.data.repository.AirportRepository;

@Service
public class AirportService {
    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public Page<AirportEntity> list(String search, int pageNumber, int pageSize, String sortProperty, Sort.Direction direction) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

        if (StringUtils.hasText(sortProperty)) {
            pageRequest = pageRequest.withSort(direction, sortProperty);
        }

        if (StringUtils.hasText(search)) {
            search = "%" + search + "%";
            return airportRepository.findByIdLikeIgnoreCaseOrIataCodeLikeIgnoreCaseOrNameLikeIgnoreCase(search, search, search, pageRequest);
        } else {
            return airportRepository.findAll(pageRequest);
        }
    }
}
