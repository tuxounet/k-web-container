import { Bootstrapper } from "./Bootstrap";

test("test standalone bootstrapping", () => {
  const bootstrap = new Bootstrapper();
  return bootstrap.main().then((rc) => {
    expect(rc).toBe(0);
  });
});
