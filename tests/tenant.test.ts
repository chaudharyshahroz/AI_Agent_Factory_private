import { describe, expect, it } from "vitest";

function canAccess(userOrganizations: string[], objectOrganizationId: string) {
  return userOrganizations.includes(objectOrganizationId);
}

describe("tenant access", () => {
  it("blocks cross-tenant objects", () => {
    expect(canAccess(["org_a"], "org_b")).toBe(false);
    expect(canAccess(["org_a"], "org_a")).toBe(true);
  });
});
