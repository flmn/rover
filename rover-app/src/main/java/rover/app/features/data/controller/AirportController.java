package rover.app.features.data.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rover.app.features.data.dto.AirportDTO;
import rover.app.shared.dto.ListResultDTO;
import rover.core.features.data.entity.AirportEntity;
import rover.core.features.data.service.AirportService;

import java.util.List;

@RestController
@RequestMapping("/api/data/airports")
public class AirportController {
    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping
    public ListResultDTO<AirportDTO> list(@RequestParam(value = "search", required = false) String search,
                                          @RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber,
                                          @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                          @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                          @RequestParam(value = "desc", required = false, defaultValue = "false") boolean desc) {
        Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;

        Page<AirportEntity> page = airportService.list(search, pageNumber, pageSize, sort, direction);

        List<AirportDTO> items = page.stream()
                .map(AirportDTO::from)
                .toList();

        return new ListResultDTO<>(pageNumber, pageSize, page.getTotalElements(), items);
    }
}
