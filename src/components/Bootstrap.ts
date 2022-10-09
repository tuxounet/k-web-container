import { injectBootstrap } from "../di/InjectBootstrap";
import { Kernel } from "../kernel/Kernel";

export class Bootstrapper {
  async main(): Promise<number> {
    const [mainKernel, releaseMainKernel] = injectBootstrap<Kernel>(Kernel);
    await mainKernel.boot();

    console.info("idle");

    await mainKernel.shutdown();
    releaseMainKernel();
    return 0;
  }
}
