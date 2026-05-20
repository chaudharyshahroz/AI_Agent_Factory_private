import test from "node:test";
import assert from "node:assert/strict";

function canAccess(userOrganizations: string[], objectOrganizationId: string) {
  return userOrganizations.includes(objectOrganizationId);
}

test("tenant access blocks cross-tenant objects", () => {
  assert.equal(canAccess(["org_a"], "org_b"), false);
  assert.equal(canAccess(["org_a"], "org_a"), true);
});
