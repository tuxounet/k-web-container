import { BaseInjectable } from "./BaseInjectable";
import { injectBootstrap } from "./InjectBootstrap";

export class DummyInjectable extends BaseInjectable {}

test("expected abstraction behaviour", () => {
  const [dummy, releaseDummy] = injectBootstrap<DummyInjectable>(
    DummyInjectable,
    "TESTING"
  );
  expect(dummy).not.toBeUndefined();
  expect(dummy.injector).not.toBeUndefined();
  expect(dummy.className).toEqual("DummyInjectable");
  expect(dummy.resolve.bind(dummy, DummyInjectable)).not.toThrow(
    /injector not set/
  );
  expect(dummy.release.bind(dummy)).not.toThrow();
  expect(releaseDummy).not.toThrow();
});

test("expected uninjectable abstraction error behaviour", () => {
  const dummy = new DummyInjectable();
  expect(dummy.injector).toBeUndefined();
  expect(dummy.className).toEqual("unknow");
  expect(dummy.resolve.bind(dummy, DummyInjectable)).toThrow(
    /injector not set/
  );

  const logSpy = jest.spyOn(console, "log");
  expect(dummy.release.bind(dummy)).not.toThrow();
  expect(logSpy).toHaveBeenCalledWith("DI-Injectable", "released class unknow");
});
