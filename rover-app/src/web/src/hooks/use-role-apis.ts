import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ListResultDTO } from "@/types/list-result";
import { RoleDTO } from "@/types/role";

const useRoleQuery = () => {
    return useQuery<ListResultDTO<RoleDTO>>({
        queryKey: ['roles'],
        queryFn: () => getWithAuthHeader('/api/platform/roles') as Promise<ListResultDTO<RoleDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useRoleMutation = ({action, queryClient}: { action: string, queryClient: QueryClient }) => {
    const mutationFn = async (roleDTO: RoleDTO): Promise<unknown> => {
        switch (action) {
            case 'create':
                return postWithAuthHeader('/api/platform/roles', roleDTO)
            case 'update':
                return postWithAuthHeader(`/api/platform/roles/${roleDTO.id}`, roleDTO)
            case 'delete':
                return deleteWithAuthHeader(`/api/platform/roles/${roleDTO.id}`)
        }
    }

    return useMutation({
        mutationFn,
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['roles']})
        },
    });
}

export { useRoleQuery, useRoleMutation }
