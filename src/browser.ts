import { Bootstrapper } from "./bootstrap/Bootstrap";

export default async function boot(): Promise<number> {
  const bootstrap = new Bootstrapper("Brower");

  const rc = await bootstrap.main();
  return rc;
}
