import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { PrivilegeDTO } from "@/types";

const usePrivilegesQuery = () => {
    return useQuery<PrivilegeDTO[]>({
        queryKey: ['privileges'],
        queryFn: () => getWithAuthHeader('/api/platform/privileges') as Promise<PrivilegeDTO[]>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { usePrivilegesQuery }
