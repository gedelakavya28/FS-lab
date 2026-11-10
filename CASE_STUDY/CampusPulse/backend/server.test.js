const test = require("node:test");
const assert = require("node:assert/strict");
const { validateStudent } = require("./server");

test("accepts a complete student record", () => {
  assert.equal(validateStudent({
    name: "Kavya", email: "kavya@example.com", course: "Computer Science", year: "2", status: "Active"
  }), null);
});

test("rejects missing required fields", () => {
  assert.equal(validateStudent({ name: "Kavya" }), "Name, email, course and year are required.");
});

test("rejects invalid email and year", () => {
  assert.equal(validateStudent({ name: "K", email: "invalid", course: "IT", year: 5 }), "Please provide a valid email address.");
});
