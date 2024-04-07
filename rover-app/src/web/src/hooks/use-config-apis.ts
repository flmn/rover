import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ListResultDTO } from "@/types/list-result";
import { ConfigDTO } from "@/types/config";

const useConfigQuery = () => {
    return useQuery<ListResultDTO<ConfigDTO>>({
        queryKey: ['configs'],
        queryFn: () => getWithAuthHeader('/api/platform/configs') as Promise<ListResultDTO<ConfigDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useConfigMutation = ({queryClient}: { queryClient: QueryClient }) => {
    return useMutation({
        mutationFn: async (configDTO: ConfigDTO) => postWithAuthHeader(`/api/platform/configs/${configDTO.id}`, configDTO),
        onSettled: async () => {
            queryClient.invalidateQueries({queryKey: ['configs']})
        },
    });
}

export { useConfigQuery, useConfigMutation }
