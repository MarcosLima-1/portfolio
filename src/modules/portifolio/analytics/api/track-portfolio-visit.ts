import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod/v4";
import { notificationService } from "@/lib/discord/index";
import { serverEnv } from "@/lib/env/server";

const trackPortfolioVisitSchema = z.object({
	path: z.string().max(200),
	referrer: z.string().max(1000),
	language: z.string().max(40),
	timeZone: z.string().max(80),
	platform: z.string().max(120),
	userAgent: z.string().max(1024),
});

const MAX_FIELD = 1024;

function truncate(value: string, max = MAX_FIELD) {
	if (value.length <= max) return value;
	return `${value.slice(0, max - 3)}...`;
}

function getVisitorIp() {
	return getRequestIP({ xForwardedFor: true }) ?? getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-real-ip") ?? "unknown";
}

export const trackPortfolioVisitServerFn = createServerFn({ method: "POST" })
	.inputValidator(trackPortfolioVisitSchema)
	.handler(async ({ data }) => {
		const channelId = serverEnv.DISCORD_VISITOR_CHANNEL_ID ?? serverEnv.DISCORD_CONTACT_CHANNEL_ID;
		const ip = getVisitorIp();

		await notificationService.notifyEmbed({
			channelId,
			title: "New portfolio visit",
			level: "info",
			description: "A visitor opened the portfolio.",
			fields: [
				{ name: "IP", value: truncate(ip), inline: true },
				{ name: "Path", value: truncate(data.path), inline: true },
				{ name: "Referrer", value: truncate(data.referrer || "direct") },
				{ name: "Language", value: truncate(data.language), inline: true },
				{ name: "Time Zone", value: truncate(data.timeZone), inline: true },
				{ name: "Platform", value: truncate(data.platform), inline: true },
				{ name: "Client User-Agent", value: truncate(data.userAgent) },
			],
		});

		return { tracked: true };
	});

export function useMutationTrackPortfolioVisit() {
	return useMutation({
		mutationKey: ["trackPortfolioVisit"],
		mutationFn: async (data: z.infer<typeof trackPortfolioVisitSchema>) => trackPortfolioVisitServerFn({ data }),
		meta: {
			method: ["POST"],
			title: "Track portfolio visit",
			desc: "Sends a notification to Discord whenever someone visits the portfolio.",
		},
	});
}
