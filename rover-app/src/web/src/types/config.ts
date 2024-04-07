export interface ConfigDTO {
    id: string;
    name: string;
    value: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}