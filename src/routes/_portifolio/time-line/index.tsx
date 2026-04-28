import { createFileRoute } from "@tanstack/react-router";
import { cn } from "tailwind-variants";
import { Landing } from "@/components/ui/landing";
import { dayjs } from "@/lib/dayjs";
import { eventTypes } from "@/modules/portifolio/pages/time-line/constants/event-type-info";
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
					{sortedEventsByDate.map(({ date, description, title, type, id }) => {
						const eventDate = dayjs(date);
						const isRecent = dayjs().diff(eventDate, "months") < 6;
						const eventInfo = eventTypes[type] || eventTypes.default;

						return (
							<div key={id} className="relative flex items-center gap-6 max-lg:flex-col-reverse">
								<div
									className={cn("relative z-10 flex size-16 items-center justify-center rounded-full border-4 shadow-lg", eventInfo.color)}
								>
									<eventInfo.icon className="size-6 text-white" />
								</div>

								<div
									className={cn("w-full flex-1 rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md", {
										isRecent: "ring-2 ring-primary/20",
									})}
								>
									<div className="mb-3 flex items-start justify-between gap-4">
										<div className="flex-1">
											<h3 className="mb-2 font-semibold text-card-foreground md:text-xl">{title}</h3>
											<div className="flex items-center gap-3 text-muted-foreground text-sm">
												<span className="font-medium">{eventDate.format("DD [de] MMMM [de] YYYY")}</span>
												<span className="text-xs">•</span>
												<span>{eventDate.fromNow()}</span>
												{isRecent && (
													<>
														<span className="text-xs">•</span>
														<span className="font-medium text-primary">Recente</span>
													</>
												)}
											</div>
										</div>
										<span className={cn("rounded-full px-3 py-1 font-medium text-xs", eventInfo.badgeColor)}>{eventInfo.label}</span>
									</div>

									<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
								</div>
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
