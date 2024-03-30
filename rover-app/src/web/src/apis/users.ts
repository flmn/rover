import ky from "ky";
import { UserEntity } from "@/types/user.ts";
import { getAuthHeader } from "@/apis/auth.ts";

export async function fetchUsers(): Promise<UserEntity[]> {
    let authHeader = getAuthHeader();

    const response = await ky.get('/api/platform/users', {
        headers: {...authHeader}
    }).json()

    return response as UserEntity[];
}