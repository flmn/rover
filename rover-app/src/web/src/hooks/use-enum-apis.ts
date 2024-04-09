import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ListResultDTO } from "@/types/list-result";
import { EnumDTO } from "@/types/enum";

const useEnumQuery = () => {
    return useQuery<ListResultDTO<EnumDTO>>({
        queryKey: ['enums'],
        queryFn: () => getWithAuthHeader('/api/platform/enums') as Promise<ListResultDTO<EnumDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useEnumMutation = ({queryClient}: { action: string, queryClient: QueryClient }) => {
    return useMutation({
        mutationFn: async (enumDTO: EnumDTO) => postWithAuthHeader(`/api/platform/enums/${enumDTO.id}`, enumDTO),
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['enums']})
        },
    });
}

const useEnumMembersMutation = ({queryClient}: { action: string, queryClient: QueryClient }) => {
    return useMutation({
        mutationFn: async (enumDTO: EnumDTO) => postWithAuthHeader(`/api/platform/enums/${enumDTO.id}/members`, enumDTO),
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['enums']})
        },
    });
}

export { useEnumQuery, useEnumMutation, useEnumMembersMutation }
