import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ServerInfoDTO } from "@/types";

const useServerInfoQuery = () => {
    return useQuery<ServerInfoDTO>({
        queryKey: ['server-info'],
        queryFn: () => getWithAuthHeader('/api/platform/server/info') as Promise<ServerInfoDTO>,
        refetchOnWindowFocus: false,
        staleTime: 10_000, // 10s
    });
}

export { useServerInfoQuery }
