import { Command } from "../../struct/Command";

const PingCommand: Command = {
	aliases: ["avatar", "a", "pp", "pfp"],
	description: "Belirttiğiniz kullanıcının avatarını gösterir.",
	argsDefinitions: [],
	permissions: [],
	usage: "avatar <@kullanıcı>",
	examples: ["avatar", "avatar @barbarbar338"],
	execute: ({ message }) => {
		const user = message.mentions.users.first() || message.author;
		message.channel.send(user.avatarURL({ dynamic: true }) as string);
	},
};

export default PingCommand;
