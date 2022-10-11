import { GenericError } from "./GenericError";

test("ensure builtin errors", () => {
  expect(GenericError.notFound("what", "which")).toHaveProperty("code", 404);
  expect(GenericError.unsupportedQuery("what", "which")).toHaveProperty(
    "code",
    405
  );
  expect(GenericError.badContent("what", "which", "whithin")).toHaveProperty(
    "code",
    422
  );
});
