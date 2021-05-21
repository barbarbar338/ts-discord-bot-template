import { Command } from "../../struct/Command";
import { isFalsy } from "utility-types";

const HelpCommand: Command = {
	aliases: ["yardım", "y", "h", "help"],
	description: "Botun komutlarını gösterir.",
	argsDefinitions: [
		{
			name: "command",
			type: String,
			default: true,
		},
	],
	permissions: [],
	usage: "yardım [komut_adı]",
	examples: ["yardım", "yardım ping"],
	execute: async ({ client, message, args }) => {
		const embedTemplate = client.utils.defaultEmbed();
		const { command } = args;

		if (isFalsy(command)) {
			embedTemplate
				.setTitle(`${client.user!.username} | Tüm Komutlar`)
				.setDescription(
					`Bir komut hakkında daha fazla bilgi almak için \`${client.config.PREFIX}yardım <komut_adı>\` komutunu kullanın`,
				);

			const help: Record<string, string[]> = {};

			for (const command of client.commands.array()) {
				if (!help.hasOwnProperty(command.category as string))
					help[command.category as string] = [];

				help[command.category as string].push(
					`\`${command.aliases[0]}\``,
				);
			}

			for (const category in help) {
				embedTemplate.addField(
					`**${
						category.charAt(0).toUpperCase() + category.slice(1)
					} Komutları**`,
					help[category].join(" | "),
				);
			}

			await message.channel.send(embedTemplate);
		} else {
			const cmd = client.commands.find((c) =>
				c.aliases.includes(command as string),
			);
			if (!cmd)
				return message.channel.send(`${command} komutu bulunamadı`);

			embedTemplate
				.setTitle(`${client.user!.username} | ${cmd.aliases[0]} Komutu`)
				.addField("Komut Adı: ", cmd.aliases[0])
				.addField("Açıklama: ", cmd.description)
				.addField("Alternatifler: ", cmd.aliases.join(", "))
				.addField(
					"Gerekli İzinler: ",
					cmd.permissions.toString() || "Herkes Kullanabilir",
				)
				.addField(
					"Kategori: ",
					(cmd.category as string).charAt(0).toUpperCase() +
						(cmd.category as string).slice(1),
				)
				.addField(
					"Doğru Kullanım: ",
					`${client.config.PREFIX}${cmd.usage}`,
				)
				.addField(
					"Örnek: ",
					` \`\`\`${cmd.examples
						.map((example) => `${client.config.PREFIX}${example}`)
						.join("\n")}\`\`\``,
				);

			return message.channel.send(embedTemplate);
		}
	},
};

export default HelpCommand;
