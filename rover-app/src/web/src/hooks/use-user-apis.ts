import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ListResultDTO, UserDTO } from "@/types";
import { MRT_PaginationState, MRT_SortingState } from "mantine-react-table";

interface QueryParams {
    pagination: MRT_PaginationState;
    globalFilter: string;
    sorting: MRT_SortingState;
}

const useUserQuery = ({globalFilter, pagination, sorting}: QueryParams) => {
    const fetchURL = new URL('/api/platform/users', 'http://localhost:5173'); // todo remove base
    fetchURL.searchParams.set('pageNumber', `${pagination.pageIndex}`,);
    fetchURL.searchParams.set('pageSize', `${pagination.pageSize}`);

    if (globalFilter) {
        fetchURL.searchParams.set('search', globalFilter ?? '');
    }

    if (sorting.length > 0) {
        const sort = sorting[0];
        fetchURL.searchParams.set('sort', sort.id);
        fetchURL.searchParams.set('desc', `${sort.desc}`);
    }

    return useQuery<ListResultDTO<UserDTO>>({
        queryKey: ['users', fetchURL.href],
        queryFn: () => getWithAuthHeader(fetchURL.href) as Promise<ListResultDTO<UserDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useUserMutation = ({action, queryClient}: { action: string, queryClient: QueryClient }) => {
    const mutationFn = async (userDTO: UserDTO): Promise<unknown> => {
        switch (action) {
            case 'create':
                return postWithAuthHeader('/api/platform/users', userDTO)
            case 'update':
                return postWithAuthHeader(`/api/platform/users/${userDTO.id}`, userDTO)
            case 'delete':
                return deleteWithAuthHeader(`/api/platform/users/${userDTO.id}`)
        }
    }

    return useMutation({
        mutationFn,
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['users']})
        },
    });
}

export { useUserQuery, useUserMutation }
