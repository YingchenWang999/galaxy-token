import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("GalaxyModule", (m) => {
  const initialHolder = m.getParameter("initialHolder");
  const galaxy = m.contract("Galaxy", [initialHolder]);

  return { galaxy };
});
