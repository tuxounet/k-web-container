export class Kernel {
  async start(): Promise<void> {
    console.info("starting");
  }

  async shutdown(): Promise<void> {
    console.info("shutdown");
  }
}
