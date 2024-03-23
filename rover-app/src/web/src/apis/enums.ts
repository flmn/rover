import ky from "ky";

export interface EnumEntity {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function fetchEnums(): Promise<EnumEntity[]> {
    const response = await ky.get('/api/platform/enums').json()

    return response as EnumEntity[];
}