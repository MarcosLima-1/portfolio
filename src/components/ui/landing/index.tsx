import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

function LandingPage({ className, children, ref, ...props }: ComponentProps<"div">) {
	return (
		<div ref={ref} data-slot="page" className={cn("relative h-full min-h-175 space-y-16 md:pt-10", className)} {...props}>
			{children}
		</div>
	);
}

function LandingContainer({ className, children, ref, ...props }: ComponentProps<"div">) {
	return (
		<div ref={ref} data-slot="container" className={cn("container relative flex size-full gap-4", className)} {...props}>
			{children}
		</div>
	);
}

function LandingSection({ className, children, ref, ...props }: ComponentProps<"div">) {
	return (
		<section ref={ref} data-slot="section" className={cn("relative w-full space-y-6 px-2 sm:px-4", className)} {...props}>
			{children}
		</section>
	);
}

const titleVariants = tv({
	base: "font-bold text-4xl",
	variants: { size: { default: "text-2xl", sm: "text-xl", lg: "text-4xl" } },
	defaultVariants: { size: "default" },
});

interface LandingTitleProps extends ComponentProps<"h2">, VariantProps<typeof titleVariants> {
	isH1?: boolean;
	showDecoration?: boolean;
}

function LandingTitle({ className, children, isH1, showDecoration, size }: LandingTitleProps) {
	const TitleElement = isH1 ? "h1" : "h2";
	return (
		<div className="w-fit">
			<TitleElement className={cn(titleVariants({ size, className }))}>{children}</TitleElement>
			{showDecoration && <div className="mt-4 h-1 w-[70%] rounded-md bg-linear-to-tr from-primary to-secondary" />}
		</div>
	);
}

function LandingDescription({ className, children }: ComponentProps<"p">) {
	return <p className={cn("mt-4 max-w-xl text-muted-foreground text-sm", className)}>{children}</p>;
}

export const Landing = {
	Page: LandingPage,
	Section: LandingSection,
	Container: LandingContainer,
	Title: LandingTitle,
	Description: LandingDescription,
};
