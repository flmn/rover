package rover.app.features.data.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.features.data.entity.AirportEntity;

import java.math.BigDecimal;

public record AirportDTO(String id,
                         String iataCode,
                         String name,
                         BigDecimal latitude,
                         BigDecimal longitude,
                         String country) implements DataTransferObject {

    public static AirportDTO from(AirportEntity entity) {
        if (entity == null) {
            return null;
        }

        return new AirportDTO(entity.getId(),
                entity.getIataCode(),
                entity.getName(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.getCountry());
    }
}
