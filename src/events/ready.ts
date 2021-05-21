import { Event } from "../struct/Event";

const ReadyEvent: Event = {
	name: "ready",
	execute: (client) => {
		client.logger.success(`Bot ${client.user?.tag} adı ile giriş yaptı.`);

		setInterval(() => {
			const now = Date.now();

			client.cooldowns
				.filter((cooldown) => now - cooldown > 5000)
				.each((_, key) => client.cooldowns.delete(key));
		}, 1000 * 60 * 30);
	},
};

export default ReadyEvent;
