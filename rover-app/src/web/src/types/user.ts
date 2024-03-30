export interface UserVO {
    id: string;
    email: string;
    isEnabled: boolean;
    isLocked: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
