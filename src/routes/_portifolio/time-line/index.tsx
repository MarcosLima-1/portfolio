import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/ui/landing";
import { EventCard } from "@/modules/portifolio/pages/time-line/components/event-card";
import { EventIcon } from "@/modules/portifolio/pages/time-line/components/event-icon";
import { sortedEventsByDate } from "@/modules/portifolio/pages/time-line/constants/timeline";

export const Route = createFileRoute("/_portifolio/time-line/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Marcos | Linha do tempo" },
			{
				name: "description",
				content: "Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais.",
			},
			{
				property: "og:title",
				content: "Marcos | Linha do tempo",
			},
			{
				property: "og:description",
				content: "Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais.",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<Landing.Page className="space-y-16">
			<div>
				<Landing.Title size="lg" showDecoration>
					Linha do tempo
				</Landing.Title>
				<Landing.Description>
					Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais, e veja como cada experiência
					moldou minha trajetória.
				</Landing.Description>
			</div>

			<Landing.Section className="px-0 md:px-0">
				<div className="absolute top-0 bottom-0 left-8 w-0.5 bg-border max-lg:left-1/2 max-lg:-translate-x-1/2" />

				<div className="space-y-8">
					{sortedEventsByDate.map((event) => {
						return (
							<div key={event.id} className="relative flex items-center gap-6 max-lg:flex-col-reverse">
								<EventIcon event={event} />
								<EventCard event={event} />
							</div>
						);
					})}
				</div>
				<div className="relative mt-8 flex items-center justify-center">
					<div className="absolute left-8 h-8 w-0.5 bg-linear-to-b from-border to-transparent max-lg:hidden" />
					<div className="flex items-center gap-2 text-muted-foreground text-sm lg:ml-8">
						<div className="size-2 rounded-full bg-muted-foreground/50" />
						<span>Início da jornada</span>
					</div>
				</div>
			</Landing.Section>
		</Landing.Page>
	);
}
