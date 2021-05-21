import { Core } from "./Core";

export interface Event {
	name: string;
	execute: (
		client: Core,
		...args: any[]
	) => Promise<unknown | void> | unknown | void;
}
