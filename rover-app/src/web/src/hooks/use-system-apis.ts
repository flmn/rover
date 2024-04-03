import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { SystemInfoDTO } from "@/types/system-info";

const useSystemInfoQuery = () => {
    return useQuery<SystemInfoDTO>({
        queryKey: ['system-info'],
        queryFn: () => getWithAuthHeader('/api/platform/system/info') as Promise<SystemInfoDTO>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useSystemInfoQuery }
