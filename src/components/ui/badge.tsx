import { cn } from "tailwind-variants";

interface BadgeProps extends React.ComponentProps<"div"> {}

export function Badge({ className, children, ...props }: BadgeProps) {
	return (
		<div
			className={cn(
				"bg- flex items-center gap-2 rounded-full border bg-linear-to-tr from-primary/30 to-secondary/30 px-2 py-1 text-sm",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
