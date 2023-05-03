/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, VStack, Box } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

// eslint-disable-next-line react/prop-types
const Tasks = ({ token }) => {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([])
  /* const [completeCount, setCompleteCount] = useState(0); */

  useEffect(() => {
    let controller = new AbortController();
    userNameHandler();
    /* taskHandler(); */
    return () => controller?.abort();
  }, []);

  const URL = "https://todo-api.ctd.academy/v1";
  const uriGetUser = URL + "/users/getMe";
  const uriTasks = URL + "/tasks";

  const settings = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  //func que consigue el nombre del usuario para que aparezca en el nav
  const userNameHandler = async () => {
    try {
      console.log("Obteniendo el nombre del usuario...");
      const response = await axios.get(uriGetUser, settings);

      setName(response.data.firstName);
    } catch (error) {
      console.log(error);
    }
  };

  const taskListHandler = (data) => {
    setTaskList(data)
  }

  //func que crea una nueva tarea
  const addTask = async () => {
    if (task !== "") {
      const payload = {
        description: task,
      };
      console.log("Agregando una nueva tarea...");
      const res = await axios.post(uriTasks, payload, settings);
      taskListHandler(res.data)
    }
  };

  const logOutHandler = () => {
    const logOut = confirm("¿Está seguro de que desea cerrar sesión?");

    if (logOut) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <VStack
      width={"100%"}
      marginBottom={10}
      h={"100%"}
      bgColor={"rgb(25,25,25)"}
   
    >
      <Navbar name={name} onLogout={logOutHandler} />
      <Box width={"50%"} >
        <Heading color={"whiteAlpha.600"} textAlign={"center"} marginBottom={30}>
          ToDo List
        </Heading>
        <TaskForm addTask={addTask} task={task} setTask={setTask} />
      </Box>

      <Box padding={4} width={"100%"} height={"50%"}>
        <TaskList token={token} taskList={taskList} setTaskList={setTaskList} />
      </Box>
    </VStack>
  );
};

export default Tasks;
