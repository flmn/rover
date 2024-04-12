import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ProfileDTO } from "@/types";

const useProfileMeQuery = () => {
    return useQuery<ProfileDTO>({
        queryKey: ['profile', 'me'],
        queryFn: () => getWithAuthHeader('/api/profile/me') as Promise<ProfileDTO>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useProfileMeQuery }