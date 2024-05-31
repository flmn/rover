import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MRT_PaginationState, MRT_SortingState } from 'mantine-react-table'
import { deleteWithAuthHeader, getWithAuthHeader, postWithAuthHeader } from '@/auth'
import { ListResultDTO, UserDTO } from '@/types'

interface QueryParams {
  pagination: MRT_PaginationState;
  globalFilter: string;
  sorting: MRT_SortingState;
}

const useUsersQuery = ({ globalFilter, pagination, sorting }: QueryParams) => {
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.set('pageNumber', `${pagination.pageIndex}`)
  urlSearchParams.set('pageSize', `${pagination.pageSize}`)

  if (globalFilter) {
    urlSearchParams.set('search', globalFilter ?? '')
  }

  if (sorting.length > 0) {
    const sort = sorting[0]
    urlSearchParams.set('sort', sort.id)
    urlSearchParams.set('desc', `${sort.desc}`)
  }

  const query = urlSearchParams.toString()

  return useQuery<ListResultDTO<UserDTO>>({
    queryKey: ['users', query],
    queryFn: () => getWithAuthHeader(`/api/platform/users?${query}`) as Promise<ListResultDTO<UserDTO>>,
    refetchOnWindowFocus: false,
    staleTime: 30_000 // 30s
  })
}

const useGetUserQuery = (id?: string) => {
  return useQuery<UserDTO>({
    queryKey: ['users', id],
    queryFn: () => {
      if (!id) {
        return {} as UserDTO
      }

      return getWithAuthHeader(`/api/platform/users/${id}`) as Promise<UserDTO>
    },
    refetchOnWindowFocus: false,
    gcTime: 0 // no cache
  })
}

const useUserMutation = ({ action }: { action: string }) => {
  const queryClient = useQueryClient()

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
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export { useUsersQuery, useGetUserQuery, useUserMutation }
