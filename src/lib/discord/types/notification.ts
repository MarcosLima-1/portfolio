export type NotificationLevel = "info" | "warning" | "error";

export type DiscordAlert = {
	title: string;
	message: string;
	level?: NotificationLevel;
	/**
	 * Optional channel ID to override the default alert channel. If not provided, the service will use the DISCORD_CONTACT_CHANNEL_ID environment variable.
	 */
	channelId?: string;
};

export type DiscordEmbedField = {
	name: string;
	value: string;
	inline?: boolean;
};

export type DiscordEmbedNotification = {
	title: string;
	description?: string;
	level?: NotificationLevel;
	channelId?: string;
	fields?: DiscordEmbedField[];
};

export interface NotificationService {
	sendMessage(channelId: string, content: string): Promise<void>;
	notify(payload: DiscordAlert): Promise<void>;
	notifyEmbed(payload: DiscordEmbedNotification): Promise<void>;
}
