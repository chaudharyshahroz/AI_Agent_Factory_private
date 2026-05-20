import { describe, expect, it } from "vitest";
import { isRiskyAction } from "@/lib/agents/tools/registry";

describe("tool approval logic", () => {
  it("flags risky actions", () => {
    expect(isRiskyAction("refund customer")).toBe(true);
    expect(isRiskyAction("answer FAQ")).toBe(false);
  });
});
