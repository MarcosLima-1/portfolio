import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Landing } from "@/components/ui/landing";
import { contacts, socialMedias } from "@/core/contacts";
import { ContactForm } from "@/modules/portifolio/pages/contact/components/contact-form";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

export const Route = createFileRoute("/_portifolio/contact/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Marcos | Contatos" },
			{
				name: "description",
				content:
					"Entre em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas conexões e oportunidades!",
			},
			{
				property: "og:title",
				content: "Marcos | Contatos",
			},
			{
				property: "og:description",
				content:
					"Entre em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas conexões e oportunidades!",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<Landing.Page>
			<div>
				<Landing.Title showDecoration size="lg">
					Contatos
				</Landing.Title>
				<Landing.Description>
					Fique à vontade para entrar em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas
					conexões e oportunidades de colaboração!
				</Landing.Description>
			</div>
			<div className="flex w-full gap-8 max-xl:flex-col-reverse">
				<Card.Root className="flex-2 border-0">
					<Card.Content className="space-y-8">
						<h2 className="font-bold text-2xl">Entre em contato</h2>
						<ContactForm />
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Content className="space-y-8">
						<div className="space-y-4">
							<h2 className="font-bold text-2xl">Contatos</h2>
							<div className="space-y-4">
								{contacts.map(({ icon: Icon, label, value }) => {
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
								})}
							</div>
						</div>
						<div className="space-y-4">
							<h2 className="font-bold text-2xl">Redes sociais</h2>
							<div className="flex flex-wrap gap-4">
								{socialMedias.map(({ icon: Icon, label, href }) => {
									return (
										<a href={href} title={label} key={href} target="_blank" rel="noreferrer">
											<Badge className="bg-none capitalize transition-colors hover:bg-accent">
												<Icon className="size-4 fill-primary" /> {label}
											</Badge>
										</a>
									);
								})}
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</Landing.Page>
	);
}
