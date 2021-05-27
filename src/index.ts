import { Core } from "./struct/Core";
import buttons from "discord-buttons";

const core = new Core();

buttons(core);

core.init();
