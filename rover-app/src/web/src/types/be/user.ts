export interface UserDTO {
    id: string;
    email: string;
    name: string;
    isEnabled: boolean;
    isLocked: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt?: Date;
}
