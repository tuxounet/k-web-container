import { injectBootstrap } from "../di/InjectBootstrap";
import { Kernel } from "../kernel/Kernel";
import { BootstapContextTypes } from "./types/BootstapContextTypes";
import { IBootstrapContext } from "./types/IBootstrapContext";
import browser_bootstrap_context from "./contexts/BrowserContext";
import cli_bootstrap_context from "./contexts/CLIContext";

export class Bootstrapper {
  constructor(private readonly contextType: BootstapContextTypes) {
    switch (contextType) {
      case "CLI":
        this.bootstrapContext = Object.assign({}, cli_bootstrap_context);
        break;
      case "Brower":
        this.bootstrapContext = Object.assign({}, browser_bootstrap_context);
    }
  }

  bootstrapContext: IBootstrapContext;
  async main(): Promise<number> {
    const [mainKernel, releaseMainKernel] = injectBootstrap<Kernel>(
      Kernel,
      this.bootstrapContext
    );
    await mainKernel.boot();

    console.info("idle");

    await mainKernel.shutdown();
    releaseMainKernel();
    return 0;
  }
}
