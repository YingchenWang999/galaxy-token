# Galaxy (GXLY)

<p align="center">
  <img src="assets/gxly-logo.png" alt="Galaxy (GXLY) logo" width="160" height="160">
</p>

Galaxy 是部署在 Base 主网的固定总量、不可升级、没有管理员特权的 ERC-20 代币项目。GXLY 定位为银河联邦主题生态的专用货币。

Galaxy is a fixed-supply, non-upgradeable ERC-20 token deployed on Base Mainnet without administrator privileges. GXLY is designed as the currency of the Galactic Federation-themed ecosystem.

- 官网 / Website: [galaxy-token-web.vercel.app](https://galaxy-token-web.vercel.app)
- BaseScan: [`0x405a51da0717c1671f90a48c48672b41E22e072e`](https://basescan.org/token/0x405a51da0717c1671f90a48c48672b41E22e072e)

[中文](#中文) · [English](#english)

## 中文

### 已确认参数

| 参数 | 值 |
| --- | --- |
| 名称 | Galaxy |
| 符号 | GXLY |
| 总量上限 | 20,000,000 GXLY |
| 小数位 | 8 |
| 增发 | 不允许 |
| 销毁 | 持有人可销毁自己的代币 |
| 暂停、冻结、黑名单 | 无 |
| 管理员或所有者 | 无 |
| 合约升级 | 不允许 |

部署时，全部 2,000 万枚 GXLY 会一次性发送到指定的 `initialHolder` 地址。合约之后没有任何增发入口。销毁会降低 `totalSupply`，但不会改变 `MAX_SUPPLY`。

### 已部署合约

| 网络 | Chain ID | 合约地址 | 初始持有人 |
| --- | ---: | --- | --- |
| Base Mainnet | 8453 | [`0x405a51da0717c1671f90a48c48672b41E22e072e`](https://basescan.org/address/0x405a51da0717c1671f90a48c48672b41E22e072e) | `0x328aa52F87f8b1571d03Ff64b42B85Fbcf3Dc77E` |
| Base Sepolia | 84532 | [`0x8b2cC76BEd7f58f53Ee133358f03811F85B3645D`](https://sepolia.basescan.org/address/0x8b2cC76BEd7f58f53Ee133358f03811F85B3645D) | `0x10AB417e25Fa1E0335E7E322958AB919383B9a38` |

Base 主网部署交易为 [`0x54798b4388746518e2e43c4d9448a711279af4f8478b2d0befb7b58b2f0de3ea`](https://basescan.org/tx/0x54798b4388746518e2e43c4d9448a711279af4f8478b2d0befb7b58b2f0de3ea)。主网合约已在 BaseScan、Blockscout 和 Sourcify 完成源码验证。

### 本地安装与测试

需要 Node.js 22 或更新版本。

```bash
pnpm install
pnpm run check
```

`check` 会依次执行 TypeScript 类型检查、生产配置编译、完整测试、Hardhat Verify 补丁回归检查、网络脚本回归检查和全等级依赖审计。任何已知依赖漏洞都会使检查失败。

编译生产优化版本：

```bash
pnpm run compile --build-profile production
```

### 部署到 Base Sepolia

1. 创建一个只用于测试网的钱包，并领取 Base Sepolia 测试 ETH。
2. 复制环境变量示例：

   ```bash
   cp .env.example .env
   ```

3. 编辑 `.env`，填入 Base Sepolia RPC、部署私钥和验证 API Key。部署与验证脚本会自动读取该文件。
4. 编辑 `ignition/parameters/baseSepolia.json`，把占位符替换成接收全部代币的钱包地址。
5. 部署：

   ```bash
   pnpm run deploy:base-sepolia
   ```

Ignition 会显示部署后的合约地址。请在 BaseScan 测试网浏览器中检查：名称、符号、小数位、总供应量和初始持有人余额。

验证已经部署的测试网合约：

```bash
pnpm run verify:base-sepolia
```

### 部署到 Base Mainnet

正式主网合约已经部署。以下流程仅用于复现或部署一个新的合约实例；执行后会产生不同的合约地址、花费真实 ETH，并再次铸造一套独立供应量。完成独立安全审计、地址复核和测试网演练前不要执行。

1. 使用硬件钱包控制的部署账户，并给它准备少量 Base 主网 ETH。
2. 将全部代币的接收地址设置为多签钱包，而不是部署者或个人热钱包。
3. 在 `.env` 中设置 `BASE_MAINNET_RPC_URL`、`BASE_MAINNET_PRIVATE_KEY` 和 `ETHERSCAN_API_KEY`；脚本会自动读取该文件。
4. 核对 `ignition/parameters/baseMainnet.json` 中的接收地址。
5. 由至少两个人分别核对合约源码、Git 提交、网络 chain ID `8453`、接收地址和部署参数。
6. 部署：

   ```bash
   pnpm run deploy:base-mainnet
   ```

7. 记录交易哈希和合约地址，然后验证源码：

   ```bash
   pnpm run verify:base-mainnet
   ```

详细发布门槛见 [`docs/MAINNET_CHECKLIST.md`](docs/MAINNET_CHECKLIST.md)。

### 安全提醒

- 不要把真实主钱包私钥写进项目、聊天或截图。
- `.env` 已被 Git 忽略，但仍建议使用只存少量测试 ETH 的专用部署钱包。
- 测试网验证不代表主网安全审计。主网上线、募资或开放交易前，应安排独立审计和当地法律合规审查。
- “固定供应”只约束合约代码；公开透明的初始分配和资金用途同样重要。

## English

### Confirmed parameters

| Parameter | Value |
| --- | --- |
| Name | Galaxy |
| Symbol | GXLY |
| Maximum supply | 20,000,000 GXLY |
| Decimals | 8 |
| Additional minting | Not allowed |
| Burning | Holders can burn their own tokens |
| Pause, freeze, or blacklist | None |
| Administrator or owner | None |
| Contract upgrades | Not allowed |

At deployment, the complete supply of 20 million GXLY is created once and sent to the configured `initialHolder` address. The contract has no later minting path. Burning reduces `totalSupply` but does not change `MAX_SUPPLY`.

### Deployed contracts

| Network | Chain ID | Contract address | Initial holder |
| --- | ---: | --- | --- |
| Base Mainnet | 8453 | [`0x405a51da0717c1671f90a48c48672b41E22e072e`](https://basescan.org/address/0x405a51da0717c1671f90a48c48672b41E22e072e) | `0x328aa52F87f8b1571d03Ff64b42B85Fbcf3Dc77E` |
| Base Sepolia | 84532 | [`0x8b2cC76BEd7f58f53Ee133358f03811F85B3645D`](https://sepolia.basescan.org/address/0x8b2cC76BEd7f58f53Ee133358f03811F85B3645D) | `0x10AB417e25Fa1E0335E7E322958AB919383B9a38` |

The Base Mainnet deployment transaction is [`0x54798b4388746518e2e43c4d9448a711279af4f8478b2d0befb7b58b2f0de3ea`](https://basescan.org/tx/0x54798b4388746518e2e43c4d9448a711279af4f8478b2d0befb7b58b2f0de3ea). The mainnet contract source is verified on BaseScan, Blockscout, and Sourcify.

### Local setup and testing

Node.js 22 or newer is required.

```bash
pnpm install
pnpm run check
```

The `check` command runs TypeScript type checking, a production-profile compile, the complete test suite, the Hardhat Verify patch regression, network-script regression checks, and a full dependency audit. Any known dependency vulnerability causes the check to fail.

Compile the production-optimized build separately with:

```bash
pnpm run compile --build-profile production
```

### Deploying to Base Sepolia

1. Create a wallet used only for testnet activity and fund it with Base Sepolia test ETH.
2. Copy the environment example:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and provide the Base Sepolia RPC URL, deployment private key, and verification API key. The deployment and verification scripts load this file automatically.
4. Edit `ignition/parameters/baseSepolia.json` and replace the placeholder with the wallet that should receive the complete supply.
5. Deploy:

   ```bash
   pnpm run deploy:base-sepolia
   ```

Ignition displays the deployed contract address. Verify the name, symbol, decimals, total supply, and initial-holder balance in the BaseScan testnet explorer.

Verify an existing testnet deployment with:

```bash
pnpm run verify:base-sepolia
```

### Deploying to Base Mainnet

The official mainnet contract is already deployed. The following process is provided only for reproducibility or for deploying a separate contract instance. It creates a different address, costs real ETH, and creates another independent supply. Do not run it without an independent security review, address verification, and a complete testnet rehearsal.

1. Use a deployment account controlled by a hardware wallet and fund it with a small amount of Base Mainnet ETH.
2. Configure a multisig wallet—not the deployer or a personal hot wallet—as the recipient of the complete supply.
3. Set `BASE_MAINNET_RPC_URL`, `BASE_MAINNET_PRIVATE_KEY`, and `ETHERSCAN_API_KEY` in `.env`; the scripts load this file automatically.
4. Verify the recipient in `ignition/parameters/baseMainnet.json`.
5. Have at least two people independently verify the contract source, Git commit, network chain ID `8453`, recipient address, and deployment parameters.
6. Deploy:

   ```bash
   pnpm run deploy:base-mainnet
   ```

7. Record the transaction hash and contract address, then verify the source:

   ```bash
   pnpm run verify:base-mainnet
   ```

See [`docs/MAINNET_CHECKLIST.md`](docs/MAINNET_CHECKLIST.md) for the complete release gates.

### Security notes

- Never place a real main-wallet private key in the repository, a chat, or a screenshot.
- `.env` is ignored by Git, but a dedicated deployment wallet holding only a small amount of ETH is still recommended.
- Testnet verification is not a mainnet security audit. Arrange an independent audit and obtain appropriate legal and regulatory advice before fundraising or enabling public trading.
- A fixed supply constrains only the contract code. Transparent initial distribution and use of funds remain equally important.
