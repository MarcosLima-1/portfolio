import type { NotificationLevel } from "@/lib/discord/types/notification";

export const ALERT_PREFIX: Record<NotificationLevel, string> = {
	info: "[INFO]",
	warning: "[WARNING]",
	error: "[ERROR]",
};

export const ALERT_COLOR: Record<NotificationLevel, number> = {
	info: 0x3b82f6,
	warning: 0xf59e0b,
	error: 0xef4444,
};
