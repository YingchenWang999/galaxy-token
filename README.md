# Galaxy (GXLY)

Galaxy 是一个固定总量、不可升级、没有管理员特权的 ERC-20 代币项目。

## 已确认参数

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

## 本地安装与测试

需要 Node.js 22 或更新版本。

```bash
pnpm install
pnpm run check
```

`check` 会依次执行 TypeScript 类型检查、生产配置编译、完整测试、Hardhat Verify 补丁回归检查和全等级依赖审计。任何已知依赖漏洞都会使检查失败。

编译生产优化版本：

```bash
pnpm run compile --build-profile production
```

## 部署到 Base Sepolia

1. 创建一个只用于测试网的钱包，并领取 Base Sepolia 测试 ETH。
2. 复制环境变量示例：

   ```bash
   cp .env.example .env
   ```

3. 在当前终端中设置环境变量。Hardhat 不会自动读取 `.env`，可以执行：

   ```bash
   set -a
   source .env
   set +a
   ```

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

## 部署到 Base Mainnet

主网部署会花费真实 ETH，并一次性把全部代币发送给 `initialHolder`。完成独立安全审计、地址复核和测试网演练前不要执行。

1. 使用硬件钱包控制的部署账户，并给它准备少量 Base 主网 ETH。
2. 将全部代币的接收地址设置为多签钱包，而不是部署者或个人热钱包。
3. 设置 `BASE_MAINNET_RPC_URL`、`BASE_MAINNET_PRIVATE_KEY` 和 `ETHERSCAN_API_KEY`。
4. 编辑 `ignition/parameters/baseMainnet.json`，替换多签地址占位符。
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

## 安全提醒

- 不要把真实主钱包私钥写进项目、聊天或截图。
- `.env` 已被 Git 忽略，但仍建议使用只存少量测试 ETH 的专用部署钱包。
- 测试网验证不代表主网安全审计。主网上线、募资或开放交易前，应安排独立审计和当地法律合规审查。
- “固定供应”只约束合约代码；公开透明的初始分配和资金用途同样重要。
