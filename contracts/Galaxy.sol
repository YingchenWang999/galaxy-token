// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title Galaxy (GXLY)
/// @notice A non-upgradeable ERC-20 with a one-time, fixed supply.
/// @dev There is deliberately no owner, mint, pause, freeze, or blacklist function.
contract Galaxy is ERC20, ERC20Burnable {
    uint8 public constant TOKEN_DECIMALS = 8;
    uint256 public constant MAX_SUPPLY = 20_000_000 * 10 ** TOKEN_DECIMALS;

    /// @param initialHolder Address that receives the complete supply at deployment.
    constructor(address initialHolder) ERC20("Galaxy", "GXLY") {
        _mint(initialHolder, MAX_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return TOKEN_DECIMALS;
    }
}
