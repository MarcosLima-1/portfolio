import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";
import { headerLinks } from "@/components/header/constants/header";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/modules/theme/components/theme-toggle";

interface HeaderProps {
	className?: string;
}

export function Header({ className }: HeaderProps) {
	return (
		<header className={cn("fixed top-0 right-0 z-50 p-2 max-lg:left-0 lg:p-4", className)}>
			<div className={cn("scroll-hidden flex w-full items-center gap-2 rounded-md border bg-card p-2")}>
				{headerLinks.map(({ href, label, icon: Icon }) => {
					return (
						<Link key={label} className="max-lg:w-full [&.active]:text-primary" to={href}>
							<Button className="gap-2" variant="ghost">
								<Icon />
								<span className="max-lg:hidden">{label}</span>
							</Button>
						</Link>
					);
				})}
				<ThemeToggle />
			</div>
		</header>
	);
}
