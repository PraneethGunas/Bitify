pragma solidity >=0.4.21 <0.7.0;

contract Collector {
    address public owner;
    // address payable[] public artists;
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

    function distribute(address payable[] calldata artists) external {
        for (uint256 i = 0; i < artists.length; i++) {
            artists[i].transfer(1 ether);
        }
    }
}
