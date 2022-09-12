async function main() {
  const [deployer] = await ethers.getSigners();
  const TodoList = await ethers.getContractFactory("todolist");
  const todoList = await TodoList.deploy();
  console.log("Token Address : ", todoList.address);
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
