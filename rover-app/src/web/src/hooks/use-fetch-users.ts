import { MRT_PaginationState } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { ListResultVO } from "@/types/list-result.ts";
import { UserVO } from "@/types/user.ts";
import { fetchWithAuthHeader } from "@/apis/auth.ts";

interface Params {
    pagination: MRT_PaginationState;
}

const useFetchUsers = ({pagination,}: Params) => {
    const fetchURL = new URL('/api/platform/users', 'http://localhost:5173'); // todo remove base
    fetchURL.searchParams.set('pageNumber', `${pagination.pageIndex}`,);
    fetchURL.searchParams.set('pageSize', `${pagination.pageSize}`);
    return useQuery<ListResultVO<UserVO>>({
        queryKey: ['users', fetchURL.href],
        queryFn: () => fetchWithAuthHeader(fetchURL.href) as Promise<ListResultVO<UserVO>>,
        staleTime: 30_000, // 30s
    });
}

export { useFetchUsers }
