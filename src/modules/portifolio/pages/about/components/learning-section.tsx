import { Image } from "@/components/misc/image";
import { Card } from "@/components/ui/card";
import { Landing } from "@/components/ui/landing";
import { learningSkills } from "@/modules/portifolio/pages/about/constants/skills";

export function LearningSection() {
	return (
		<Landing.Section>
			<div>
				<Landing.Title>Aprendendo no momento</Landing.Title>
				<Landing.Description>
					Essas são as tecnologias que estou estudando atualmente para aprimorar minhas habilidades e expandir meu conhecimento.
				</Landing.Description>
			</div>

			<div className="space-y-8">
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap">
					{learningSkills.map(({ icon, name }) => {
						return (
							<Card.Root key={name} className="w-full lg:size-37">
								<Card.Content className="flex h-full flex-col items-center justify-center gap-2 text-center">
									<Image alt={name} height={50} width={50} src={`/skills-icons/${icon}.webp`} />
									<h3 className="font-bold text-sm">{name}</h3>
								</Card.Content>
							</Card.Root>
						);
					})}
				</div>
			</div>
		</Landing.Section>
	);
}
