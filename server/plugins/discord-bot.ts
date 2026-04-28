import { definePlugin } from "nitro";
import { notificationService } from "../../src/lib/discord/index";

export default definePlugin(async () => {
	try {
		await notificationService.start();
	} catch (error) {
		console.error("[discord] Failed to initialize bot on backend startup.", error);
	}
});
