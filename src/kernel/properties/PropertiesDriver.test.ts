import { PropertiesDriver } from "./PropertiesDriver";
import fs from "fs";
import { injectBootstrap } from "../../di/InjectBootstrap";
test("expected properties driver standalone get and set value", async () => {
  const properties = new PropertiesDriver();

  expect(await properties.inject({ key1: "value1" })).toBeUndefined();
  expect(await properties.getValue("key1")).toBe("value1");

  expect(await properties.setValue("key1", "plop")).toBeUndefined();
  expect(await properties.getValue("key1")).toBe("plop");

  expect(await properties.getValueOrDefault("key2", "plop")).toBe("plop");
  expect(await properties.getValueOrDefault("key1", "different")).toBe("plop");
  expect(properties.getValue("key4")).rejects.toHaveProperty("code", 404);
});

test("expected properties driver with persistence mechanism", async () => {
  const [properties, releaseProperties] = injectBootstrap<PropertiesDriver>(
    PropertiesDriver,
    "TESTING"
  );
  properties.propertyFileName = "testing.json";
  expect(await properties.clear()).toBeUndefined();
  expect(await properties.persist()).toBeUndefined();

  expect(await properties.setValue("key1", "value1")).toBeUndefined();
  expect(await properties.getValue("key1")).toBe("value1");
  expect(await properties.persist()).toBeUndefined();
  expect(await properties.clear()).toBeUndefined();
  expect(await properties.load()).toBeUndefined();

  expect(fs.unlinkSync(properties.propertyFileName)).toBeUndefined();
  expect(releaseProperties()).toBeUndefined();
});
