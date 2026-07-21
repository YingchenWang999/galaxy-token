import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

assert.match(
  packageJson.scripts["verify:base-sepolia"],
  /--network baseSepolia(?:\s|$)/,
  "Base Sepolia verification must select the baseSepolia network",
);

assert.match(
  packageJson.scripts["verify:base-mainnet"],
  /--network baseMainnet(?:\s|$)/,
  "Base mainnet verification must select the baseMainnet network",
);

console.log("Verification scripts select their expected networks.");
