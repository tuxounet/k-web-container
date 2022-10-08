import { Kernel } from "./Kernel";

export class Bootstrapper {
  async main(): Promise<number> {
    const kernel = new Kernel();
    await kernel.start();

    console.info("idle");

    await kernel.shutdown();

    return 0;
  }
}
