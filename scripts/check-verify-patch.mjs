import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { AbiCoder } from "ethers";

const require = createRequire(import.meta.url);
const pluginRoot = dirname(
  require.resolve("@nomicfoundation/hardhat-verify/package.json"),
);
const constructorArgsModule = await import(
  pathToFileURL(join(pluginRoot, "dist/src/internal/constructor-args.js"))
);
const artifact = JSON.parse(
  await readFile(
    new URL("../artifacts/contracts/Galaxy.sol/Galaxy.json", import.meta.url),
    "utf8",
  ),
);
const parameters = JSON.parse(
  await readFile(
    new URL("../ignition/parameters/baseSepolia.json", import.meta.url),
    "utf8",
  ),
);
const initialHolder = parameters?.$global?.initialHolder;
const actual = await constructorArgsModule.encodeConstructorArgs(
  artifact.abi,
  [initialHolder],
  "contracts/Galaxy.sol:Galaxy",
);
const expected = AbiCoder.defaultAbiCoder()
  .encode(["address"], [initialHolder])
  .slice(2);

if (actual !== expected) {
  throw new Error("Patched Hardhat Verify constructor encoding is incorrect");
}

console.log("Patched Hardhat Verify constructor encoding passed.");
