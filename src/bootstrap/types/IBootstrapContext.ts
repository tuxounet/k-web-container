import { BootstapContextTypes } from "./BootstapContextTypes";

export interface IBootstrapContext extends Record<string, string> {
  type: BootstapContextTypes;
}
