import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_PaginationState, MRT_SortingState } from "mantine-react-table";
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { AirportDTO, ListResultDTO } from "@/types";

interface QueryParams {
    pagination: MRT_PaginationState;
    globalFilter: string;
    sorting: MRT_SortingState;
}

const useAirportsQuery = ({globalFilter, pagination, sorting}: QueryParams) => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('pageNumber', `${pagination.pageIndex}`,);
    urlSearchParams.set('pageSize', `${pagination.pageSize}`);

    if (globalFilter) {
        urlSearchParams.set('search', globalFilter ?? '');
    }

    if (sorting.length > 0) {
        const sort = sorting[0];
        urlSearchParams.set('sort', sort.id);
        urlSearchParams.set('desc', `${sort.desc}`);
    }

    const query = urlSearchParams.toString();

    return useQuery<ListResultDTO<AirportDTO>>({
        queryKey: ['airports', query],
        queryFn: () => getWithAuthHeader(`/api/data/airports?${query}`) as Promise<ListResultDTO<AirportDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useGetAirportQuery = (id?: string) => {
    return useQuery<AirportDTO>({
        queryKey: ['airports', id],
        queryFn: () => {
            if (!id) {
                return {} as AirportDTO;
            }

            return getWithAuthHeader(`/api/data/airports/${id}`) as Promise<AirportDTO>;
        },
        refetchOnWindowFocus: false,
        gcTime: 0, // no cache
    });
}

const useAirportMutation = ({action}: { action: string }) => {
    const queryClient = useQueryClient();

    const mutationFn = async (airportDTO: AirportDTO): Promise<unknown> => {
        switch (action) {
            case 'create':
                return postWithAuthHeader('/api/data/airports', airportDTO)
            case 'update':
                return postWithAuthHeader(`/api/data/airports/${airportDTO.id}`, airportDTO)
            case 'delete':
                return deleteWithAuthHeader(`/api/data/airports/${airportDTO.id}`)
        }
    }

    return useMutation({
        mutationFn,
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['airports']})
        },
    });
}

export { useAirportsQuery, useGetAirportQuery, useAirportMutation }
