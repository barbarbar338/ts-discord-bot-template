import { Event } from "../struct/Event";

const output = ["yazi", "tura"];

const ClickButtonEvent: Event = {
	name: "clickButton",
	execute: (client, button) => {
		const { reply, clicker, id } = button;
		const res = output[Math.floor(Math.random() * output.length)];

		const embed = client.utils
			.defaultEmbed()
			.setDescription(`${clicker.user.tag} \`${id}\` attı`)
			.addField(
				"Sonuç: ",
				`${res}: (${res === id ? "Kazandı" : "Kaybetti"})`,
			);

		reply.send("Yazı tura sonuç", { embed });
	},
};

export default ClickButtonEvent;
