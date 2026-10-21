const fs = require("node:fs");
const assert = require("node:assert/strict");
const html = fs.readFileSync("index.html", "utf8");
const checks = [
  ["document title", /<title>myTIME \| Time Clock<\/title>/i],
  ["FOSS navy brand token", /--ink:\s*#09266f/i],
  ["FOSS blue brand token", /--brand-blue:\s*#2458c6/i],
  ["Purista/Segoe UI font stack", /Purista.*Segoe UI.*Arial/s],
  ["official FOSS logo", /foss-logo\.png/i],
  ["FOSS favicon", /fossanalytics\.com\/favicon\.ico/i],
  ["responsive viewport", /name="viewport"/i],
  ["print styles", /@media\s+print/i],
  ["landscape timesheet print layout", /@page\s+wide\s*\{\s*size:\s*letter\s+landscape/i],
  ["interactive app scripts", /<script[\s>]/i],
  ["form controls", /<input\b/i],
];
const failures = checks.filter(([_, pattern]) => !pattern.test(html));
for (const [name] of checks) console.log((failures.some(([f]) => f === name) ? "FAIL " : "PASS ") + name);
if (failures.length) {
  console.error("\nSmoke check failed: " + failures.map(([name]) => name).join(", "));
  process.exit(1);
}
console.log("\nAll " + checks.length + " smoke checks passed.");
