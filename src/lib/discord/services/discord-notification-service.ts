import { Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import { ALERT_COLOR, ALERT_PREFIX } from "@/lib/discord/constants/notification";
import type { DiscordAlert, DiscordEmbedNotification, NotificationService } from "@/lib/discord/types/notification";
import { serverEnv } from "@/lib/env/server";

if (typeof window !== "undefined") {
	throw new Error("The Discord client can only run on the backend.");
}

export class DiscordNotificationService implements NotificationService {
	private readonly client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
	});

	private isStarted = false;
	private startPromise: Promise<void> | null = null;

	public async start() {
		if (this.isStarted && this.client.isReady()) return;
		if (this.startPromise) return this.startPromise;

		this.startPromise = (async () => {
			this.client.once(Events.ClientReady, (readyClient) => {
				console.log(`Logged in as ${readyClient.user.tag}!`);
			});

			this.client.on(Events.MessageCreate, async (message) => {
				if (message.author.bot) return;
				if (message.content.toLowerCase() !== "ping") return;

				await message.reply("Pong!");
			});

			await this.client.login(serverEnv.DISCORD_TOKEN);
			this.isStarted = true;
		})();

		try {
			await this.startPromise;
		} finally {
			this.startPromise = null;
		}
	}

	private getTargetChannel(channelId?: string) {
		return channelId ?? serverEnv.DISCORD_CONTACT_CHANNEL_ID;
	}

	public async sendMessage(channelId: string, content: string) {
		const channel = await this.client.channels.fetch(channelId);
		if (!channel?.isSendable()) {
			throw new Error(`Discord channel ${channelId} was not found or does not accept messages.`);
		}

		await channel.send(content);
	}

	public async notify({ title, message, level = "info", channelId }: DiscordAlert) {
		const targetChannelId = this.getTargetChannel(channelId);
		if (!targetChannelId) {
			throw new Error("DISCORD_CONTACT_CHANNEL_ID environment variable is not set. Cannot send alert.");
		}

		const prefix = ALERT_PREFIX[level];
		await this.sendMessage(targetChannelId, `${prefix} **${title}**\n${message}`);
	}

	public async notifyEmbed({ title, description, level = "info", channelId, fields }: DiscordEmbedNotification) {
		const targetChannelId = this.getTargetChannel(channelId);
		if (!targetChannelId) {
			throw new Error("DISCORD_CONTACT_CHANNEL_ID environment variable is not set. Cannot send alert.");
		}

		await this.start();

		const channel = await this.client.channels.fetch(targetChannelId);
		if (!channel?.isSendable()) {
			throw new Error(`Discord channel ${targetChannelId} was not found or does not accept messages.`);
		}

		const embed = new EmbedBuilder().setTitle(title).setColor(ALERT_COLOR[level]).setTimestamp();

		if (description) {
			embed.setDescription(description);
		}

		if (fields?.length) {
			embed.addFields(fields);
		}

		await channel.send({ embeds: [embed] });
	}
}
