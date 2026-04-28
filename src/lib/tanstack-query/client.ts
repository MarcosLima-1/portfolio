import { QueryClient } from "@tanstack/react-query";
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME, RETRY_DELAY } from "@/core/cache";
import { mutationCache, queryCache } from "@/lib/tanstack-query/cache";
import { queryRetryHandler } from "./retry";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: DEFAULT_STALE_TIME,
			gcTime: DEFAULT_GC_TIME,
			refetchOnReconnect: true,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retryDelay: RETRY_DELAY,
			retry: queryRetryHandler,
		},
	},
	mutationCache,
	queryCache,
});
