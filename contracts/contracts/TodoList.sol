//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract todolist
{
    struct todoList
    {
        string task;
        uint256 index;
        bool isCompleted;
    }
    //initialising the global index
    uint256 public indexGlobal;


    //creating an array to store todo Tasks
    todoList[] public tasks;
    //event for sending after the task is completed
    event taskCreate(
        string taskName,
        uint256 index,
        bool isCompleted
    );
    //creating the funcitons to createTask
    function createTask(string memory taskName) public
    {
        //creating the data for the task
        todoList memory task = todoList(
            {
                index: indexGlobal,
                task: taskName,
                isCompleted: false
            }
        );
        //storing the task in the memory
        tasks.push(task);
        indexGlobal++;
        emit taskCreate(taskName, task.index, task.isCompleted);

    }

    //get all completed tasks
    function getAllCompleted() public view returns(todoList[] memory)
    {
        
        uint256 lengthTasks = tasks.length;
        todoList[] memory AllCompleted = new todoList[](lengthTasks);
        uint idx =0;
        for(uint i=0;i<lengthTasks;i++)
        {
            todoList memory value = tasks[i];
            if(value.isCompleted == false)
            {
                AllCompleted[idx] = value;
                idx++;
            }
    
        }
        return AllCompleted;
    }

    //delete Tasks
    function removeTask(uint256 index) public returns (bool)
    {
        tasks[index].isCompleted = true;
        return true;
    }

    
}