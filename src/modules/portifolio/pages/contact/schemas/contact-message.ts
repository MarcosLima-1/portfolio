import { z } from "zod/v4";

export const contactMessageSchema = z.object({
	name: z.string().trim().min(3, "O nome deve ter no minimo 3 caracteres.").max(100, "O nome deve ter no maximo 100 caracteres."),
	email: z.email("Por favor, insira um endereco de email valido.").max(100, "O email deve ter no maximo 100 caracteres."),
	message: z
		.string()
		.trim()
		.min(10, "A mensagem deve ter no minimo 10 caracteres.")
		.max(600, "A mensagem deve ter no maximo 600 caracteres."),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
