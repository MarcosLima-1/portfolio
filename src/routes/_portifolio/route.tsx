import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/header/components/header";
import { SideInfoCard } from "@/components/side-card/components/side-info-card";
import { Card } from "@/components/ui/card";
import { useMutationTrackPortfolioVisit } from "@/modules/portifolio/analytics/api/track-portfolio-visit";

export const Route = createFileRoute("/_portifolio")({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutate: trackPortfolio } = useMutationTrackPortfolioVisit();

	useEffect(() => {
		const sessionKey = "portfolio-visit-tracked";
		if (window.sessionStorage.getItem(sessionKey) === "1") return;

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";

		trackPortfolio({
			path: window.location.pathname,
			referrer: document.referrer || "direct",
			language: navigator.language || "unknown",
			timeZone,
			platform: navigator.platform || "unknown",
			userAgent: navigator.userAgent || "unknown",
		});

		window.sessionStorage.setItem(sessionKey, "1");
	}, [trackPortfolio]);

	return (
		<div className="relative flex h-svh w-svw gap-4 overflow-x-hidden overflow-y-scroll p-2 max-lg:flex-col lg:p-4">
			<Header />
			<SideInfoCard />
			<Card.Root className="h-fit flex-1 overflow-visible p-4 lg:min-h-full lg:p-8">
				<Outlet />
			</Card.Root>
		</div>
	);
}
