import { Client, Collection } from "discord.js";
import { CONFIG } from "../config";
import { Util } from "./Util";
import * as pogger from "pogger";
import { Command } from "./Command";
import * as database from "./Database";

export class Core extends Client {
	public config = CONFIG;
	public logger = pogger;

	public database = database;
	public commands = new Collection<string, Command>();
	public cooldowns = new Collection<string, number>();
	public readonly utils = new Util(this);

	constructor() {
		super();
	}

	public async init() {
		this.logger.event("Dosyalar yükleniyor");

		await this.utils.loadCommands();
		await this.utils.loadEvents();

		this.logger.success("Dosyalar yüklendi");
		this.logger.event("Discord API'ye bağlanılıyor");

		const token = await this.login(this.config.TOKEN);

		return token;
	}
}
