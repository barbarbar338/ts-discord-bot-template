import { Result } from "bargs/dist";
import { Object } from "ts-toolbelt";
import { Command } from "../../struct/Command";

interface AFKArgs {
	reason: string;
}

const AFKCommand: Command = {
	aliases: ["afk"],
	description: "AFK moduna girersiniz.",
	argsDefinitions: [
		{
			name: "reason",
			type: String,
			default: true,
		},
	],
	permissions: [],
	usage: "afk <sebep>",
	examples: ["afk Bir süreliğine AFK olacağım."],
	execute: async ({ client, message, args }) => {
		const { reason } = args as Object.Merge<AFKArgs, Result>;
		if (!reason) return message.channel.send("Bir AFK sebebi belirtin.");
		if (reason.length > 60)
			return message.channel.send(
				"AFK sebebi 60 karakterden uzun olamaz.",
			);

		await client.database.global.set(
			`${message.author.id}.afk.started_at`,
			Date.now(),
		);
		await client.database.global.set(
			`${message.author.id}.afk.reason`,
			reason,
		);

		message.channel.send(
			`Başarıyla \`${reason}\` sebebiyle AFK moduna girdiniz.`,
		);
	},
};

export default AFKCommand;
