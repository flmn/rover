import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getWithAuthHeader, postWithAuthHeader } from '@/auth'
import { EnumDTO, ListResultDTO } from '@/types'

const useEnumsQuery = () => {
  return useQuery<ListResultDTO<EnumDTO>>({
    queryKey: ['enums'],
    queryFn: () => getWithAuthHeader('/api/platform/enums') as Promise<ListResultDTO<EnumDTO>>,
    refetchOnWindowFocus: false,
    staleTime: 30_000 // 30s
  })
}

const useEnumMembersMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (enumDTO: EnumDTO) => postWithAuthHeader(`/api/platform/enums/${enumDTO.id}/members`, enumDTO),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['enums'] })
    }
  })
}

export { useEnumsQuery, useEnumMembersMutation }
