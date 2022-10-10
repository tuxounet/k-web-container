import { injectBootstrap } from "../di/InjectBootstrap";
import { Kernel } from "../kernel/Kernel";
import { BootstapContextTypes } from "./types/BootstapContextTypes";
import { IBootstrapContext } from "./types/IBootstrapContext";
import cli_bootstrap_context from "./contexts/CLIContext";

export class Bootstrapper {
  constructor(private readonly contextType: BootstapContextTypes) {}

  async main(): Promise<number> {
    let bootstrapContext: IBootstrapContext = { type: "NONE" };
    switch (this.contextType) {
      case "CLI":
        bootstrapContext = Object.assign({}, cli_bootstrap_context);
        break;
    }
    const [mainKernel, releaseMainKernel] = injectBootstrap<Kernel>(Kernel);
    await mainKernel.boot(bootstrapContext);

    console.info("idle");

    await mainKernel.shutdown();
    releaseMainKernel();
    return 0;
  }
}
