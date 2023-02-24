//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CyasInu is ERC20 {
    uint256 constant _initial_supply = 1000 * (10**18);

    constructor() ERC20("CyasInu", "CINU") {
        _mint(msg.sender, _initial_supply);
    }
}
