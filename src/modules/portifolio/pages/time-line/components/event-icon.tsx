import { cn } from "tailwind-variants";
import { eventTypes } from "@/modules/portifolio/pages/time-line/constants/event-type-info";
import type { TimelineEvent } from "@/modules/portifolio/pages/time-line/types/timeline-event";

type EventIconProps = {
	event: TimelineEvent;
};

export function EventIcon({ event }: EventIconProps) {
	const eventInfo = eventTypes[event.type] || eventTypes.default;
	return (
		<div className={cn("relative z-10 flex size-16 items-center justify-center rounded-full border-4 shadow-lg", eventInfo.color)}>
			<eventInfo.icon className="size-6 text-white" />
		</div>
	);
}
