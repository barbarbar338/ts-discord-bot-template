import { Result } from "bargs/dist";
import { Object } from "ts-toolbelt";
import { Command } from "../../struct/Command";

interface CalculateArgs {
	operator: "+" | "-" | "/" | "*";
	first: number;
	second: number;
}

interface CalculateCommandProps {
	mapping: {
		"+": (a: number, b: number) => number;
		"-": (a: number, b: number) => number;
		"*": (a: number, b: number) => number;
		"/": (a: number, b: number) => number;
	};
}

const CalculateCommand: Object.Merge<Command, CalculateCommandProps> = {
	aliases: ["hesapla", "işlem", "islem"],
	description: "Bot dört işlem yapar.",
	argsDefinitions: [
		{
			name: "operator",
			type: String,
			aliases: ["o"],
		},
		{
			name: "first",
			type: Number,
			aliases: ["a"],
		},
		{
			name: "second",
			type: Number,
			aliases: ["b"],
		},
	],
	permissions: [],
	usage: "hesapla -a <sayı> -b <sayı> -o <operatör>",
	examples: [
		"hesapla -a 5 -b 7 -o *",
		"hesapla -a 5 -b 7 -o -",
		"hesapla -a 5 -b 7 -o +",
		"hesapla -a 5 -b 7 -o /",
	],
	mapping: {
		"+": (a: number, b: number) => a + b,
		"-": (a: number, b: number) => a - b,
		"*": (a: number, b: number) => a * b,
		"/": (a: number, b: number) => a / b,
	},
	execute: async ({ client, message, args }) => {
		const { first, operator, second } = args as Object.Merge<
			CalculateArgs,
			Result
		>;
		if (
			!operator ||
			!first ||
			!second ||
			!["+", "-", "*", "/"].includes(operator) ||
			isNaN(first) ||
			isNaN(second)
		)
			return message.channel.send(
				`Geçerli bir sayı ve operatör belirtin. Doğru kullanım için \`${client.config.PREFIX}yardım ${CalculateCommand.aliases[0]}\` komutunu kullanın.`,
			);

		const result = CalculateCommand.mapping[operator](first, second);
		message.channel.send(`${first} ${operator} ${second} = ${result}`);
	},
};

export default CalculateCommand;
