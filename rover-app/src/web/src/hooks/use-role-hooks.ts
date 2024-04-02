import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from "@/auth";
import { ListResultDTO } from "@/types/list-result.ts";
import { RoleDTO } from "@/types/role.ts";

const useRoleQuery = () => {
    return useQuery<ListResultDTO<RoleDTO>>({
        queryKey: ['roles'],
        queryFn: () => getWithAuthHeader('/api/platform/roles') as Promise<ListResultDTO<RoleDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useRoleMutation = ({type, queryClient}: { type: string, queryClient: QueryClient }) => {
    let mutationFn;
    switch (type) {
        case 'create':
            mutationFn = async (role: RoleDTO) => {
                return postWithAuthHeader('/api/platform/roles', role)
            }
            break;
        case 'update':
            mutationFn = async (role: RoleDTO) => {
                return postWithAuthHeader(`/api/platform/roles/${role.id}`, role)
            }
            break;
        case 'delete':
            mutationFn = async (role: RoleDTO) => {
                return deleteWithAuthHeader(`/api/platform/roles/${role.id}`)
            }
            break;
    }

    return useMutation({
        mutationFn,
        onSettled: async () => {
            queryClient.invalidateQueries({queryKey: ['roles']})
        },
    });
}

export { useRoleQuery, useRoleMutation }
