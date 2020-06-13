pragma solidity >=0.4.21 <0.7.0;

contract Collector {
    address public owner;
    uint256 public regFee;

    mapping(address => uint256) public balance;

    constructor() public {
        owner = msg.sender;
        regFee = 100 ether;
    }

    event reg(address indexed _from);

    function register() external payable {
        require(msg.value == 100 ether);
        balance[address(this)] += regFee;
        emit reg(msg.sender);
    }
}
