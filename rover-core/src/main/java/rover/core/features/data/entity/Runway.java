package rover.core.features.data.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.features.data.constants.DataTableNames;

@Table(DataTableNames.RUNWAY)
public class Runway {

    @Column("airport_id")
    private String airportId; // 隐式处理

    @Column("name")
    private String name;

    public String getAirportId() {
        return airportId;
    }

    public void setAirportId(String airportId) {
        this.airportId = airportId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
