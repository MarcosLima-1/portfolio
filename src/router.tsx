import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { LockKeyholeIcon, SearchXIcon } from "lucide-react";
import { GenericError } from "@/components/status/generic-error";
import { NotFound } from "@/components/status/not-found";
import { SplashScreen } from "@/components/status/splash-screen";
import { UnavailableContent } from "@/components/status/unavailable-content";
import { queryClient } from "@/lib/tanstack-query/client";
import { routeTree } from "@/types/routeTree.generated";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: false,
		defaultPreloadStaleTime: 0,
		defaultViewTransition: true,
		defaultErrorComponent: ({ error }: { error: Error }) => {
			if (isAxiosError(error)) {
				if (error.response?.status === 404) {
					return <UnavailableContent icon={SearchXIcon} title="Conteudo não encontrado" />;
				}
				if (error.response?.status === 403) {
					return <UnavailableContent icon={LockKeyholeIcon} title="Você não tem permissão para acessar esse conteúdo" />;
				}
				if (error.response?.status === 400) {
					return <UnavailableContent icon={SearchXIcon} title="Parametros inválidos!" />;
				}
			}
			return <GenericError error={error} />;
		},
		defaultNotFoundComponent: () => <NotFound />,
		defaultPendingComponent: () => <SplashScreen />,
		context: {
			queryClient,
		},
	});

	return router;
}
