import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { AccountDTO } from "@/types";

const useAccountQuery = () => {
    return useQuery<AccountDTO>({
        queryKey: ['account', 'me'],
        queryFn: () => getWithAuthHeader('/api/account/me') as Promise<AccountDTO>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useAccountQuery }