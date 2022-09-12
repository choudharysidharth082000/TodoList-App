import React from "react";
import Card from "../components/Card";
import Web3 from "web3";
import { useEffect, useState } from "react";
import ABI from "../abi_todoList.json";
import ModalNext from "../components/Modal.jsx";
var contract;

const Home = () => {
  const [address, setAddress] = useState("");
  const [getTask, setGetTask] = useState([]);
  //authenticate
  const web3Load = async () => {
    const provider = await new Web3(
      Web3.givenProvider || "http://localhost:8545"
    );
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    var Contract = require("web3-eth-contract");
    console.log("This is the account",accounts);
    setAddress(accounts[0]);

    // set provider for all later instances to use
    Contract.setProvider(Web3.givenProvider || "http://localhost:8545");
    contract = new Contract(ABI, "0xd210bfeda5f6411d57356870432fed446372f927");
    const getTasks = await contract.methods.getAllCompleted().call();
    setGetTask(getTasks);
  };
  useEffect(() => {
    web3Load();
    
  }, []);
  const [task, setTask] = useState("");
  //handling the input tag
  const inputTask = (e) => {
    const value = e.target.value;
    console.log(value);
    setTask(value);
  };
  //HANDLING THE SUBMIT BUTTON
  const handleSubmit = async () => {
    
    try {
      console.log(address);
      const postTask = await contract.methods.createTask(task).send({
        from: address,
      });
      console.log(postTask);
      alert("Task Created");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="containor w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center flex-col p-14">
      <h1 className="text-2xl text-white">
        <span className="text-3xl font-semibold font-mono">TodoList App</span>{" "}
        (Powered By Blockchain and Web3)
      </h1>
      <div className="inputSubmit p-4 w-[60%] flex justify-around items-center">
        <input
          type="text"
          placeholder="Buy Coffee"
          value={task}
          onChange={inputTask}
          className="py-6 px-4 w-[70%] outline-none rounded-md"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-5 px-10 text-white font-mono rounded-md font-semibold text-xl"
        >
          Create
        </button>
      </div>
      <div className="containorTasks p-6 flex justify-center items-center w-[50%] my-7 flex-col h-96 overflow-y-scroll">
        {getTask.map((task, index)=>
        {
          return <Card name={task[0]} key={index} index={index} />
        })}
      </div>
    </div>
  );
};

export default Home;
