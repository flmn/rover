export interface UserDTO {
    id: string;
    email: string;
    name: string;
    isEnabled: boolean;
    isLocked: boolean;
    lastLoginAt?: Date;
    roles: string[];
    createdAt: Date;
    updatedAt?: Date;
}
