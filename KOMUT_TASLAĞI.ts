import { Command } from "../../struct/Command";

const PingCommand: Command = {
	aliases: ["ping", "p"],
	description: "Botun pingini gösterir.",
	argsDefinitions: [],
	permissions: [],
	usage: "ping",
	examples: ["ping"],
	execute: ({ client, message, args }) => {
		message.channel.send(`:ping_pong: Pong! Pingim: ${client.ws.ping}ms`);
	},
};

export default PingCommand;
