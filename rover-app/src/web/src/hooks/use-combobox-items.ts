import { useQuery } from "@tanstack/react-query";
import { ComboboxItemDTO } from "@/types";
import { getWithAuthHeader } from "@/auth";

const useComboboxQuery = (url: string) => {
    return useQuery<ComboboxItemDTO[]>({
        queryKey: ['combobox-items', url],
        queryFn: () => getWithAuthHeader(url) as Promise<ComboboxItemDTO[]>,
        refetchOnWindowFocus: false,
        staleTime: 30_000, // 30s
    });
}

export { useComboboxQuery };
