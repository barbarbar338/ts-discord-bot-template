import { config } from "dotenv";

config();

export const CONFIG = {
	IS_DEV: process.env.NODE_ENV === "development",
	TOKEN: process.env.TOKEN as string,
	OWNERS: ["331846231514939392"],
	PREFIX: "!",
	COOLDOWN: 5000,
};
