import { config } from "dotenv";

config();

export const CONFIG = {
	IS_DEV: process.env.NODE_ENV === "development",
	TOKEN: process.env.TOKEN as string,
	OWNERS: ["952574663916154960"],
	PREFIX: "?",
	COOLDOWN: 2500,
};
