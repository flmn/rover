export interface EnumMemberDTO {
    value: string;
    label: string;
    displayOrder: number;
    isDefault: boolean;
}

export interface EnumDTO {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    members: EnumMemberDTO[];
}
