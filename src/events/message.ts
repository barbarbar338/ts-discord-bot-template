import { Message, PermissionResolvable } from "discord.js";
import { Core } from "../struct/Core";
import { Event } from "../struct/Event";
import { bargs } from "bargs";
import { Object } from "ts-toolbelt";

const MessageEvent: Object.Merge<
	Event,
	{
		checkCooldown: (client: Core, message: Message) => Promise<boolean>;
		checkPermissions: (
			client: Core,
			message: Message,
			permissions: PermissionResolvable,
		) => Promise<boolean>;
	}
> = {
	name: "message",
	checkCooldown: async (client, message) => {
		const cooldown = client.cooldowns.get(message.author.id);
		const now = Date.now();
		const diff = now - (cooldown ?? 0);

		if (diff < client.config.COOLDOWN) {
			const parsed = client.utils.parseMs(client.config.COOLDOWN - diff);
			await message.channel.send(
				`Bir komut daha kullanmadan önce ${parsed.seconds} saniye beklemen lazım.`,
			);

			return true;
		}

		client.cooldowns.set(message.author.id, now);
		return false;
	},
	checkPermissions: async (client, message, permissions) => {
		const hasPermission =
			client.config.OWNERS.includes(message.author.id) ||
			message.member?.permissions.has(permissions);

		if (!hasPermission) {
			await message.channel.send(
				`Bu komutu kullanabilmek için \`${permissions.toString()}\` yetkilerine ihtiyacın var.`,
			);

			return true;
		}

		return false;
	},
	execute: async (client, message: Message) => {
		if (
			message.author.bot ||
			!message.guild ||
			!message.content ||
			!message.content.startsWith(client.config.PREFIX)
		)
			return;

		const [commandName, ...args] = message.content
			.slice(client.config.PREFIX.length)
			.trim()
			.split(/\s+/g);
		const command = client.commands.find((cmd) =>
			cmd.aliases.includes(commandName),
		);
		if (!command) return;

		if (
			await MessageEvent.checkPermissions(
				client,
				message,
				command.permissions,
			)
		)
			return;
		if (await MessageEvent.checkCooldown(client, message)) return;

		await command.execute({
			client,
			message,
			args: bargs(command.argsDefinitions, args),
		});
	},
};

export default MessageEvent;
