import { cn } from "tailwind-variants";
import { dayjs } from "@/lib/dayjs";
import { eventTypes } from "@/modules/portifolio/pages/time-line/constants/event-type-info";
import type { TimelineEvent } from "@/modules/portifolio/pages/time-line/types/timeline-event";

type EventCardProps = {
	event: TimelineEvent;
};

export function EventCard({ event }: EventCardProps) {
	const eventDate = dayjs(event.date);
	const isRecent = dayjs().diff(eventDate, "months") < 6;
	const eventInfo = eventTypes[event.type] || eventTypes.default;

	return (
		<div
			className={cn("w-full flex-1 rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md", {
				isRecent: "ring-2 ring-primary/20",
			})}
		>
			<div className="mb-3 flex items-start justify-between gap-4">
				<div className="flex-1">
					<h3 className="mb-2 font-semibold text-card-foreground md:text-xl">{event.title}</h3>
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

			<p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
		</div>
	);
}
