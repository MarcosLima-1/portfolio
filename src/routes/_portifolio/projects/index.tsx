import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogProvider, DialogTrigger } from "@/components/ui/dialog";
import { TitlePage } from "@/modules/portifolio/components/title-page";
import { ProjectCard } from "@/modules/portifolio/pages/projects/components/project-card";
import { ProjectDialog } from "@/modules/portifolio/pages/projects/components/project-dialog";
import { projects } from "@/modules/portifolio/pages/projects/constants/projects";
import { type ProjectCategory, projectCategories, projectCategoriesInfo } from "@/types/project";

export const Route = createFileRoute("/_portifolio/projects/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Projetos - Markin | Desenvolvedor Full-stack & Web",
			},
		],
	}),
});

function RouteComponent() {
	const [currentProject, setCurrentProject] = useState<ProjectCategory>("all");
	const filteredProjects = currentProject === "all" ? projects : projects.filter((project) => project.categories.includes(currentProject));

	return (
		<div className="h-full space-y-16">
			<TitlePage title="Projetos" />
			<div className="space-y-6">
				<div className="flex w-fit max-w-full gap-2 overflow-x-auto rounded-md border p-2">
					{projectCategories.options.map((categories) => {
						const displayName = projectCategoriesInfo[categories].displayName;
						const isActive = currentProject === categories;
						return (
							<Button onClick={() => setCurrentProject(categories)} key={categories} variant={isActive ? "default" : "ghost"}>
								{displayName}
							</Button>
						);
					})}
				</div>

				<div className="grid gap-8 max-md:place-content-center md:grid-cols-2 lg:flex lg:flex-wrap">
					{filteredProjects.map((project) => {
						return (
							<DialogProvider key={project.id}>
								<DialogTrigger className="text-left">
									<ProjectCard project={project} />
								</DialogTrigger>
								<ProjectDialog project={project} />
							</DialogProvider>
						);
					})}
				</div>
			</div>
		</div>
	);
}
