import test from "node:test";
import assert from "node:assert/strict";
import { validateBlueprint } from "@/lib/agents/blueprint-schema";
import { createDefaultBlueprintFromTemplate, getRiskyActionsFromBlueprint } from "@/lib/agents/blueprint-utils";

test("validates a default blueprint", () => {
  const blueprint = createDefaultBlueprintFromTemplate("e-commerce", "customer-support-agent");
  assert.ok(validateBlueprint(blueprint).agentName);
});

test("rejects invalid blueprints", () => {
  assert.throws(() => validateBlueprint({ agentName: "" }));
});

test("extracts risky actions", () => {
  const blueprint = createDefaultBlueprintFromTemplate("service-business", "appointment-booking-agent");
  assert.ok(getRiskyActionsFromBlueprint(blueprint).includes("book appointment"));
});
