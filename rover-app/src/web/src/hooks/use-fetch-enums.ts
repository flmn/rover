import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ListResultDTO } from "@/types/list-result.ts";
import { EnumDTO } from "@/types/enum.ts";

const useFetchEnums = () => {
    const url = '/api/platform/enums';

    return useQuery<ListResultDTO<EnumDTO>>({
        queryKey: ['enums', url],
        queryFn: () => getWithAuthHeader(url) as Promise<ListResultDTO<EnumDTO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useFetchEnums }
