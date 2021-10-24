pragma solidity ^0.8.9;

import "./VoteToken.sol";

contract VoteDApp {

    struct Election {
        string topic;
        bool isFinished;
        uint256 result;
        Option options;
    }

    struct Option {
        uint256 id;
        string candidate;
        address[] addresses;
    }

    string public name = "Vote DApp";
    address public owner;
    VoteToken public voteToken;


    constructor(VoteToken _voteToken) public {
        voteToken = _voteToken;
        owner = msg.sender;
    }


    function createVote() public {}

    function addOptionToVote() public {}

    function plusOne() public {}

    function closeVote() public {}







}
