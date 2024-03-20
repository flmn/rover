package rover.app.features.fleet.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.app.shared.entity.SoftDeletableEntity;

@Table("fleet_aircraft")
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
