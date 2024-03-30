import { useQuery } from "@tanstack/react-query";
import { fetchWithAuthHeader } from "@/apis/auth.ts";
import { EnumVO } from "@/types/enum.ts";
import { ListResultVO } from "@/types/list-result.ts";

const useFetchEnums = () => {
    const url = '/api/platform/enums';

    return useQuery<ListResultVO<EnumVO>>({
        queryKey: ['enums', url],
        queryFn: () => fetchWithAuthHeader(url) as Promise<ListResultVO<EnumVO>>,
        staleTime: 30_000, // 30s
    });
}

export { useFetchEnums }
