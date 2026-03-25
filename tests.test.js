import { expect, test } from "vitest";
import {
  calculatePercentage,
  generateProgress,
} from "./progress_generation.js";

test("expect calculatePercentage to return a string", () => {
  const percentage = calculatePercentage();
  expect(percentage).toBeTypeOf("string");
});
