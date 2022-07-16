import React from "react";
import { useEffect, useState } from "react";
import ABI from "../abi_todoList.json"
import Web3 from "web3";
import ModalNext from "../components/Modal.jsx";
var contract;
const Card = (props) => {
  //useEffect to get the address of the contract and loading web3
  const web3Load = async () => {
    const provider = await new Web3(
      Web3.givenProvider || "http://localhost:8545"
    );
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    var Contract = require("web3-eth-contract");
    // set provider for all later instances to use
    Contract.setProvider(Web3.givenProvider || "http://localhost:8545");
    contract = new Contract(ABI, "0x1be9f511e9ebd8cd2a320533581465f547a9011b");
  };

  //useEffect to get the task from the contract
  useEffect(() => {
    web3Load();
  }, []);

  //deleting the tasks
  const deleteTask = async (index) => {
    try {
      const deleteTask = await contract.methods.removeTask(index).call();
      console.log(deleteTask);
      alert("Task Deleted");
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="card flex justify-around items-center p-4 w-full bg-white m-3">
      <h1 className="flex-1 font-sans">{props.name}</h1>
      <button className="mx-5 bg-red-500 px-8 py-3 rounded-md text-white"
      onClick={()=>
      {
        deleteTask(props.index);
      }}>
        Delete
      </button>
      <button className=" bg-yellow-500 px-8 py-3 rounded-md text-white" onClick={()=>
      {
        return <ModalNext />
      }}>
        Edit
      </button>
      {/* <ModalNext /> */}
      
    </div>
  );
};

export default Card;
