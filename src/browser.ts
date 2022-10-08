import { Bootstrapper } from "./components/Bootstrap";

export default async function boot(): Promise<number> {
  const bootstrap = new Bootstrapper();

  const rc = await bootstrap.main();
  return rc;
}
