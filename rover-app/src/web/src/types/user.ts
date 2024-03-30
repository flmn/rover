export interface UserEntity {
    id: string;
    email: string;
    password: string;
    isEnabled: boolean;
    isLocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt: Date;
}
