import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { loadEnvFile } from "node:process";
import { isAddress, ZeroAddress } from "ethers";

if (existsSync(".env")) {
  loadEnvFile(".env");
}

const parametersPath = new URL(
  "../ignition/parameters/baseMainnet.json",
  import.meta.url,
);

const requiredEnvironmentVariables = [
  "BASE_MAINNET_RPC_URL",
  "BASE_MAINNET_PRIVATE_KEY",
];

const parameters = JSON.parse(await readFile(parametersPath, "utf8"));
const initialHolder = parameters?.$global?.initialHolder;

if (!isAddress(initialHolder) || initialHolder === ZeroAddress) {
  throw new Error(
    "ignition/parameters/baseMainnet.json must contain a non-zero initialHolder address",
  );
}

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required`);
  }
}

if (!/^https:\/\//u.test(process.env.BASE_MAINNET_RPC_URL)) {
  throw new Error("BASE_MAINNET_RPC_URL must use HTTPS");
}

if (!/^0x[0-9a-fA-F]{64}$/u.test(process.env.BASE_MAINNET_PRIVATE_KEY)) {
  throw new Error("BASE_MAINNET_PRIVATE_KEY must be a 32-byte hex private key");
}

console.log("Base Mainnet preflight passed.");
