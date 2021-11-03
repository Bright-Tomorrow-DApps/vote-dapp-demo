pragma solidity ^0.8.9;

import "./VoteToken.sol";

contract VoteDApp {

    struct Vote {
        string topic;
        bool isFinished;
        uint256 result;
        address starterAddress;
        Option[] options;
    }
    

    struct Option {
        uint256 optionID;
        string option;
        address[] addresses;
    }

    string public name = "Vote DApp";
    uint256 public voteID;
    address public owner;
    VoteToken public voteToken;

    mapping(uint256 => Vote) public votes;

    constructor(VoteToken _voteToken) public {
        voteToken = _voteToken;
        owner = msg.sender;
    }


    function createVote(string memory _topic) public {
        voteID++;
        votes[voteID].starterAddress = msg.sender;
        votes[voteID].topic = _topic;
    }

    function addOptionToVote(uint256 _voteID, string memory _option) public {
        address[] memory emptyAddressArray;
        uint256 optionID = votes[_voteID].options.length;
        
        votes[_voteID].options.push(

            Option({
                optionID: optionID,
                option: _option,
                addresses: emptyAddressArray
            })
        );
    }

    function plusOne(uint256 _voteID,uint256 _optionID) public {
        votes[_voteID].options[_optionID].addresses.push(msg.sender);
    }

    function closeVote(uint256 _voteID) public {
        votes[_voteID].isFinished = true;
    }
}
