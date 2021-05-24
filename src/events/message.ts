import { Message, PermissionResolvable } from "discord.js";
import { Core } from "../struct/Core";
import { Event } from "../struct/Event";
import { bargs } from "bargs";
import { Object } from "ts-toolbelt";
import { AFKData } from "../struct/Types";

const MessageEvent: Object.Merge<
	Event,
	{
		checkAFK: (client: Core, message: Message) => Promise<void>;
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
	checkAFK: async (client, message) => {
		const now = Date.now();
		const selfData = (await client.database.global.get(
			`${message.author.id}.afk`,
		)) as AFKData;

		if (selfData) {
			await client.database.global.delete(`${message.author.id}.afk`);

			const parsed = client.utils.parseMs(now - selfData.started_at);
			await message.channel.send(
				`AFK modundan çıktınız. AFK kalma süreniz: ${parsed.days}g ${parsed.hours}s ${parsed.minutes}d ${parsed.seconds}s`,
			);
		}

		if (message.mentions.members) {
			const mention = message.mentions.members.first();
			if (
				mention &&
				!mention.user.bot &&
				mention.user.id !== message.author.id
			) {
				const data = (await client.database.global.get(
					`${mention.id}.afk`,
				)) as AFKData;
				if (!data) return;

				const parsed = client.utils.parseMs(now - data.started_at);
				await message.channel.send(
					`\`${mention.user.tag}\` kullanıcısı ${parsed.days}g ${parsed.hours}s ${parsed.minutes}d ${parsed.seconds}s süredir AFK. Sebep: \`\`\`${data.reason}\`\`\``,
				);
			}
		}
	},
	execute: async (client, message: Message) => {
		await MessageEvent.checkAFK(client, message);

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
