pragma solidity >=0.4.21 <0.7.0;

contract HelloWorld {
    string greet = "Voila!";

    function set(string memory val) public {
        greet = val;
    }

    function get() public view returns (string memory) {
        return greet;
    }
}
