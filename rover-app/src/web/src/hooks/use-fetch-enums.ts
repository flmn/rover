import { useQuery } from "@tanstack/react-query";
import { getWithAuthHeader } from "@/auth";
import { ListResultVO } from "@/types/list-result.ts";
import { EnumVO } from "@/types/enum.ts";

const useFetchEnums = () => {
    const url = '/api/platform/enums';

    return useQuery<ListResultVO<EnumVO>>({
        queryKey: ['enums', url],
        queryFn: () => getWithAuthHeader(url) as Promise<ListResultVO<EnumVO>>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useFetchEnums }
