import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";
import { ACCESS_TOKEN_KEY } from "@/config/constants";
import { getWithAuthHeader, request, requestWithAuthHeader } from "@/auth";
import { AccountDTO, LoginRequestDTO, LoginResultDTO } from "@/types";

const useAccountQuery = () => {
    return useQuery<AccountDTO>({
        queryKey: ['account', 'me'],
        queryFn: () => getWithAuthHeader('/api/account/me') as Promise<AccountDTO>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

const useLoginMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (loginRequest: LoginRequestDTO) => request<LoginResultDTO>(`/api/public/login`, {
            method: 'post',
            json: loginRequest
        }),
        onSuccess: async (loginResult: LoginResultDTO) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, loginResult.accessToken)

            await navigate({to: '/'})

            notifications.show({
                title: '通知',
                message: '登录成功。',
            })
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['account']})
        },
    });
}

const useLogoutMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => requestWithAuthHeader('/api/account/logout', {
            method: 'post'
        }),
        onSuccess: async () => {
            localStorage.removeItem(ACCESS_TOKEN_KEY);

            await navigate({to: '/login'})

            notifications.show({
                title: '通知',
                message: '已退出登录。',
            })
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['account']})
        },
    })
}

export { useAccountQuery, useLoginMutation, useLogoutMutation }