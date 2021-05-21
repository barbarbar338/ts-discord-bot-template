import { Message, PermissionResolvable } from "discord.js";
import { Core } from "./Core";
import { Result, OptionDefinitions } from "bargs";

export interface CommandArgs {
	client: Core;
	message: Message;
	args: Result;
}

export interface Command {
	aliases: string[];
	description: string;
	argsDefinitions: OptionDefinitions;
	permissions: PermissionResolvable;
	category?: string;
	usage: string;
	examples: string[];
	execute: (args: CommandArgs) => Promise<unknown | void> | unknown | void;
}
