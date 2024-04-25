import { RoleDTO } from "./role";

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    isEnabled: boolean;
    isLocked: boolean;
    roles: RoleDTO[];
    createdAt: Date;
    updatedAt?: Date;
}
