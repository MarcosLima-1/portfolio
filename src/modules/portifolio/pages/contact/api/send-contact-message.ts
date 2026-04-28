import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { notificationService } from "@/lib/discord/index";
import { type ContactMessageInput, contactMessageSchema } from "@/modules/portifolio/pages/contact/schemas/contact-message";

const sendContactMessageServerFn = createServerFn({ method: "POST" })
	.inputValidator(contactMessageSchema)
	.handler(async ({ data }) => {
		await notificationService.notifyEmbed({
			title: "New contact message",
			level: "info",
			description: "A new message was received from the portfolio contact form.",
			fields: [
				{ name: "Name", value: data.name, inline: true },
				{ name: "Email", value: data.email, inline: true },
				{ name: "Message", value: data.message.slice(0, 1024) || "-" },
			],
		});

		return { sent: true };
	});

export function useMutationSendContactMessage() {
	return useMutation({
		mutationFn: async (data: ContactMessageInput) => sendContactMessageServerFn({ data }),
		meta: {
			method: ["POST"],
			title: "Enviar mensagem",
			desc: "Envia uma mensagem através do formulário de contato.",
			errorMessage: "Falha ao enviar a mensagem. Por favor, tente novamente.",
		},
	});
}
