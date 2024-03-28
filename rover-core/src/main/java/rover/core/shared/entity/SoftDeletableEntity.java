package rover.core.shared.entity;

import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

public abstract class SoftDeletableEntity extends BaseEntity {

    @Column("is_deleted")
    private Boolean isDeleted = Boolean.FALSE;

    @Column("deleted_at")
    private LocalDateTime deletedAt;

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
