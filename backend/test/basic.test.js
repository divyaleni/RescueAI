const test = require("node:test");
const assert = require("node:assert");

test("Food Rescue Platform application name test", () => {
    const appName = "Food Rescue Platform";

    assert.strictEqual(appName, "Food Rescue Platform");
});

test("Basic calculation test", () => {
    assert.strictEqual(2 + 3, 5);
});