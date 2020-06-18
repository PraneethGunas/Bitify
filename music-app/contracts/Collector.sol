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
        require(msg.value == 100 ether, "You are not trsnsferring 100 coins");
        balance[address(this)] += regFee;
        emit reg(msg.sender);
    }

    event done(string started);
    event Addr(address indexed _from);

    function payArtist(uint256 transferAmount)
        external
        payable
        returns (bool success)
    {
        emit Addr(address(this));
        require(
            address(this).balance >= transferAmount,
            "You have no enough balance in contract to transfer"
        );
        require(
            msg.value == transferAmount,
            "You are not transferring enough value"
        );
        msg.sender.transfer(msg.value);
        emit done("Success");
        return true;
    }
}
