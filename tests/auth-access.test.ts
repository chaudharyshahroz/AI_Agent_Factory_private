import test from "node:test";
import assert from "node:assert/strict";
import { isRiskyAction } from "@/lib/agents/risk";

test("tool approval logic flags risky actions", () => {
  assert.equal(isRiskyAction("refund customer"), true);
  assert.equal(isRiskyAction("answer FAQ"), false);
});
