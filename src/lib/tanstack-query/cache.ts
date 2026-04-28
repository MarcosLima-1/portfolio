import { type Mutation, MutationCache, type Query, QueryCache } from "@tanstack/react-query";
import { globalErrorHandler, globalSuccessHandler } from "@/lib/tanstack-query/handlers";

export const mutationCache = new MutationCache({
	onError: (error, _, _1, mutation) => globalErrorHandler(error, mutation as Mutation),
	onSuccess: (_, _1, _2, mutation) => globalSuccessHandler(mutation as Mutation),
});

export const queryCache = new QueryCache({
	onError: (error, query) => globalErrorHandler(error, query as Query),
	onSuccess: (_, query) => globalSuccessHandler(query as Query),
});
