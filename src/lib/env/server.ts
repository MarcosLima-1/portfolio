import z from "zod/v4";
import { clientEnvSchema } from "@/lib/env/client";

const envSchema = clientEnvSchema.extend({
	DISCORD_TOKEN: z.string(),
	DISCORD_CONTACT_CHANNEL_ID: z.string(),
	DISCORD_VISITOR_CHANNEL_ID: z.string().optional(),
});

export const serverEnv = envSchema.parse(process.env);
