import { config } from "dotenv";

config();

export const CONFIG = {
	IS_DEV: process.env.NODE_ENV === "development",
	TOKEN: process.env.TOKEN as string,
	OWNERS: ["331846231514939392", "470974660264067072"],
	PREFIX: "?",
	COOLDOWN: 2500,
};
