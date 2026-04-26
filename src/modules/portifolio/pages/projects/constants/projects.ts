import type { Project } from "@/schemas/project";

export const projects: Project[] = [
	{
		id: "1",
		title: "Comedyhub",
		description: "uma rede social de memes, onde os usuarios pode postar, comentar, salvar e curtir varios memes.",
		techs: ["Elysia", "TypeScript", "Postgres", "Docker", "Nginx", "TanStack Libs"],
		platforms: ["mobile", "desktop", "web"],
		images: ["/projects/comedyhub.webp"],
		links: [
			{
				name: "The ComedyHub",
				type: "external",
				href: "https://thecomedyhub.com.br/",
			},
		],
		categories: ["personal", "work"],
	},
	{
		id: "2",
		title: "krikipromo",
		description: "programa e site para divulgação em grupos automatizada de oferta de produtos.",
		techs: ["n8n", "Elysia", "Postgres", "TypeScript", "TanStack Libs"],
		platforms: ["web"],
		images: ["/projects/krikipromo.webp"],
		links: [
			{
				name: "Krikipromo",
				type: "external",
				href: "https://krikipromo.com",
			},
		],
		categories: ["personal"],
	},
	{
		id: "3",
		title: "Portfólio",
		description: "Portfólio pessoal e painel de administração para gerenciar e exibir meus projetos dinamicamente.",
		techs: ["Elysia", "TypeScript", "Postgres", "Docker"],
		platforms: ["web"],
		images: ["/projects/portifolio.webp"],
		links: [
			{
				name: "Site",
				type: "external",
				href: "https://markinlima.com/",
			},
			{
				name: "GitHub",
				type: "github",
				href: "https://github.com/MarcosLima-1/portifolio",
			},
		],
		categories: ["demo"],
	},
];
