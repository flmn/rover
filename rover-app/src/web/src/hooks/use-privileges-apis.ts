import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ListResultDTO, PrivilegeDTO } from "@/types";

const usePrivilegesQuery = () => {
    return useQuery<ListResultDTO<PrivilegeDTO>>({
        queryKey: ['privileges'],
        queryFn: () => getWithAuthHeader('/api/platform/privileges') as Promise<ListResultDTO<PrivilegeDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { usePrivilegesQuery }
