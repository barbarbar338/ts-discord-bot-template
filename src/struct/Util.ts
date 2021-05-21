import { Core } from "./Core";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "./Command";
import { Event } from "./Event";
import { MessageEmbed } from "discord.js";

export class Util {
	private client: Core;

	constructor(client: Core) {
		this.client = client;
	}

	public async loadCommands() {
		this.client.logger.event("Komutlar yükleniyor");

		const categories = readdirSync(join(__dirname, "..", "commands"));
		for (const category of categories) {
			this.client.logger.info(`${category} kategorisi yükleniyor`);

			const commandFiles = readdirSync(
				join(__dirname, "..", "commands", category),
			);
			for (const name of commandFiles) {
				this.client.logger.info(`${name} komutu yükleniyor`);

				const command = (
					await import(
						join(__dirname, "..", "commands", category, name)
					)
				).default as Command;
				command.category = category;

				const cmd_name = command.aliases[0] as string;
				this.client.commands.set(cmd_name, command);

				this.client.logger.success(`${name} komutu yüklendi`);
			}
			this.client.logger.success(`${category} kategorisi yüklendi`);
		}

		this.client.logger.success("Tüm komutlar yüklendi");
	}

	public async loadEvents() {
		this.client.logger.event("Eventler yükleniyor");

		const events = readdirSync(join(__dirname, "..", "events"));
		for (const name of events) {
			this.client.logger.info(`${name} eventi yükleniyor`);

			const event = (await import(join(__dirname, "..", "events", name)))
				.default as Event;

			this.client.on(event.name, (...args) =>
				event.execute(this.client, ...args),
			);

			this.client.logger.success(`${name} eventi yüklendi`);
		}

		this.client.logger.success("Tüm eventler yüklendi");
	}

	public parseMs(ms: number) {
		return {
			days: Math.trunc(ms / 86400000),
			hours: Math.trunc(ms / 3600000) % 24,
			minutes: Math.trunc(ms / 60000) % 60,
			seconds: Math.trunc(ms / 1000) % 60,
			milliseconds: Math.trunc(ms) % 1000,
			microseconds: Math.trunc(ms * 1000) % 1000,
			nanoseconds: Math.trunc(ms * 1e6) % 1000,
		};
	}

	public defaultEmbed() {
		const embed = new MessageEmbed()
			.setColor("GREEN")
			.setTimestamp(Date.now())
			.setFooter(
				"Template Bot",
				this.client.user?.avatarURL({
					dynamic: true,
					format: "png",
				}) as string,
			);

		return embed;
	}
}
