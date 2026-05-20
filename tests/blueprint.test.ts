import { describe, expect, it } from "vitest";
import { validateBlueprint } from "@/lib/agents/blueprint-schema";
import { createDefaultBlueprintFromTemplate, getRiskyActionsFromBlueprint } from "@/lib/agents/blueprint-utils";

describe("blueprints", () => {
  it("validates a default blueprint", () => {
    const blueprint = createDefaultBlueprintFromTemplate("e-commerce", "customer-support-agent");
    expect(validateBlueprint(blueprint).agentName).toBeTruthy();
  });

  it("rejects invalid blueprints", () => {
    expect(() => validateBlueprint({ agentName: "" })).toThrow();
  });

  it("extracts risky actions", () => {
    const blueprint = createDefaultBlueprintFromTemplate("service-business", "appointment-booking-agent");
    expect(getRiskyActionsFromBlueprint(blueprint)).toContain("book appointment");
  });
});
