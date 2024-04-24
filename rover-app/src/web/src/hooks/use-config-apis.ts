import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ConfigDTO, ListResultDTO } from "@/types";

const useConfigsQuery = () => {
    return useQuery<ListResultDTO<ConfigDTO>>({
        queryKey: ['configs'],
        queryFn: () => getWithAuthHeader('/api/platform/configs') as Promise<ListResultDTO<ConfigDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useConfigQuery = (id: string) => {
    return useQuery<ConfigDTO>({
        queryKey: ['configs', id],
        queryFn: () => getWithAuthHeader(`/api/platform/configs/${id}`) as Promise<ConfigDTO>,
        refetchOnWindowFocus: false,
        gcTime: 0, // no cache
    });
}

const useConfigMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (configDTO: ConfigDTO) => postWithAuthHeader(`/api/platform/configs/${configDTO.id}`, configDTO),
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['configs']})
        },
    });
}

export { useConfigsQuery, useConfigQuery, useConfigMutation }
