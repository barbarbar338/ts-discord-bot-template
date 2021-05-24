import { Database, FSAdapter } from "bookman";

export const global = new Database(
	new FSAdapter({
		databaseName: "global",
		defaultDir: "database",
	}),
);
