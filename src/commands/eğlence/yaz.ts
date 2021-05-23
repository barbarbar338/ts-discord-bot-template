import { Result } from "bargs/dist";
import { Object } from "ts-toolbelt";
import { Command } from "../../struct/Command";

interface SayArgs {
	content: string;
}

const SayCommand: Command = {
	aliases: ["yaz", "söyle", "konuş", "soyle", "konus"],
	description: "Bot sizin yazdığınız cümleyi tekrarlar.",
	argsDefinitions: [
		{
			name: "content",
			type: String,
			aliases: ["mesaj", "message", "m"],
			default: true,
		},
	],
	permissions: [],
	usage: "yaz <metin>",
	examples: ["yaz Merhaba dünya!"],
	execute: async ({ message, args }) => {
		const { content } = args as Object.Merge<SayArgs, Result>;
		if (!content)
			return message.channel.send(
				"Göndermemi istediğiniz mesajı belirtin.",
			);
		await message.delete();
		message.channel.send(content);
	},
};

export default SayCommand;
