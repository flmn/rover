import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from "@/auth";
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

const useEnumMutation = ({action, queryClient}: { action: string, queryClient: QueryClient }) => {
    const mutationFn = async (enumDTO: EnumDTO): Promise<unknown> => {
        switch (action) {
            case 'create':
                return postWithAuthHeader('/api/platform/enums', enumDTO)
            case 'update':
                return postWithAuthHeader(`/api/platform/enums/${enumDTO.id}`, enumDTO)
            case 'delete':
                return deleteWithAuthHeader(`/api/platform/enums/${enumDTO.id}`)
        }
    }

    return useMutation({
        mutationFn,
        onSettled: async () => {
            queryClient.invalidateQueries({queryKey: ['enums']})
        },
    });
}

export { useEnumQuery, useEnumMutation }
