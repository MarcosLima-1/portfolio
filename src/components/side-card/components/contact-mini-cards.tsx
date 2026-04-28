import type { LucideIcon } from "lucide-react";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

interface ContactMiniCardsProps {
	label: string;
	value: string;
	icon: LucideIcon;
}

export function ContactMiniCards({ label, value, icon: Icon }: ContactMiniCardsProps) {
	return (
		<button
			type="button"
			onClick={() => copyToClipboard({ value: value, message: `${label} Copiado(a)!` })}
			className="flex cursor-pointer items-center gap-2 text-left"
			key={value}
		>
			<div className="rounded-md border p-4">
				<Icon className="text-primary" />
			</div>
			<div>
				<p className="font-bold text-muted-foreground">{label}</p>
				<p className="text-sm">{value}</p>
			</div>
		</button>
	);
}
