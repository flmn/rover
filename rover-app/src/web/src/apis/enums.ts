import ky from "ky";
import { EnumEntity } from "@/types/enum.ts";
import { getAuthHeader } from "@/apis/auth.ts";

export async function fetchEnums(): Promise<EnumEntity[]> {
    let authHeader = getAuthHeader();

    const response = await ky.get('/api/platform/enums', {
        headers: {...authHeader}
    }).json()

    return response as EnumEntity[];
}