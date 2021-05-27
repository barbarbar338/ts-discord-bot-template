import { MessageButton } from "discord-buttons";
import { Command } from "../../struct/Command";

const FlipACoinCommand: Command = {
	aliases: ["yt", "yazı-tura", "yazi-tura", "yazıtura", "yazitura"],
	description: "Yazı tura atarsınız.",
	argsDefinitions: [],
	permissions: [],
	usage: "yt",
	examples: ["yt"],
	execute: ({ message }) => {
		const yazi = new MessageButton()
			.setID("yazi")
			.setLabel("Yazı")
			.setStyle("red"); // red green gray blurple

		const tura = new MessageButton()
			.setID("tura")
			.setLabel("Tura")
			.setStyle("green"); // red green gray blurple

		message.channel.send("Yazı mı tura mı?", {
			buttons: [yazi, tura],
		} as any);
	},
};

export default FlipACoinCommand;
