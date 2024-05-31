import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from '@/auth'
import { ListResultDTO, RoleDTO } from '@/types'

const useRolesQuery = () => {
  return useQuery<ListResultDTO<RoleDTO>>({
    queryKey: ['roles'],
    queryFn: () => getWithAuthHeader('/api/platform/roles') as Promise<ListResultDTO<RoleDTO>>,
    refetchOnWindowFocus: false,
    staleTime: 30_000 // 30s
  })
}

const useGetRoleQuery = (id?: string) => {
  return useQuery<RoleDTO>({
    queryKey: ['roles', id],
    queryFn: () => {
      if (!id) {
        return {} as RoleDTO
      }

      return getWithAuthHeader(`/api/platform/roles/${id}`) as Promise<RoleDTO>
    },
    refetchOnWindowFocus: false,
    gcTime: 0 // no cache
  })
}

const useRoleMutation = ({ action }: { action: string }) => {
  const queryClient = useQueryClient()

  const mutationFn = async (roleDTO: RoleDTO): Promise<RoleDTO | undefined> => {
    switch (action) {
      case 'create':
        return postWithAuthHeader('/api/platform/roles', roleDTO) as Promise<RoleDTO>
      case 'update':
        return postWithAuthHeader(`/api/platform/roles/${roleDTO.id}`, roleDTO) as Promise<RoleDTO>
      case 'delete':
        return deleteWithAuthHeader(`/api/platform/roles/${roleDTO.id}`) as Promise<RoleDTO>
    }
  }

  return useMutation({
    mutationFn,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}

export { useRolesQuery, useGetRoleQuery, useRoleMutation }
