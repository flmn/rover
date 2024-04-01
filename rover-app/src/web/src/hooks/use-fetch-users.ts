import { MRT_PaginationState, MRT_SortingState } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ListResultVO } from "@/types/list-result.ts";
import { UserVO } from "@/types/user.ts";

interface Params {
    pagination: MRT_PaginationState;
    globalFilter: string;
    sorting: MRT_SortingState;
}

const useFetchUsers = ({globalFilter, pagination, sorting}: Params) => {
    const fetchURL = new URL('/api/platform/users', 'http://localhost:5173'); // todo remove base
    fetchURL.searchParams.set('pageNumber', `${pagination.pageIndex}`,);
    fetchURL.searchParams.set('pageSize', `${pagination.pageSize}`);

    if (globalFilter) {
        fetchURL.searchParams.set('search', globalFilter ?? '');
    }

    if (sorting.length > 0) {
        let sort = sorting[0];
        fetchURL.searchParams.set('sort', sort.id);
        fetchURL.searchParams.set('desc', `${sort.desc}`);
    }

    return useQuery<ListResultVO<UserVO>>({
        queryKey: ['users', fetchURL.href],
        queryFn: () => getWithAuthHeader(fetchURL.href) as Promise<ListResultVO<UserVO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useFetchUsers }
