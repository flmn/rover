package rover.core.features.fleet.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.features.fleet.constants.FleetTableNames;
import rover.core.shared.entity.SoftDeletableEntity;

@Table(FleetTableNames.AIRCRAFT)
public class AircraftEntity extends SoftDeletableEntity {

    @Column("reg_num")
    private String regNum;

    public String getRegNum() {
        return regNum;
    }

    public void setRegNum(String regNum) {
        this.regNum = regNum;
    }
}
