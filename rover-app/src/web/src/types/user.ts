export interface UserVO {
    id: string;
    email: string;
    name: string;
    isEnabled: boolean;
    isLocked: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
