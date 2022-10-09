import { Bootstrapper } from "./Bootstrap";

test("test standalone cli bootstrapping", () => {
  const bootstrap = new Bootstrapper("CLI");
  return bootstrap.main().then((rc) => {
    expect(rc).toBe(0);
  });
});
