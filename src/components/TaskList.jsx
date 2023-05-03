/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  HStack,
  Badge,
  Box,
  VStack,
  Button,
  ListItem,
  List,
  SlideFade,
  Heading,
} from "@chakra-ui/react";

const TaskList = ({ token, taskList, setTaskList }) => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  useEffect(() => {
    let controller = new AbortController();
    taskHandler();
    console.log("el useEffect console");
    return () => controller?.abort();
  }, [taskList]);

  const URL = "https://todo-api.ctd.academy/v1";
  const uriTasks = URL + "/tasks";

  const settings = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  const taskHandler = async () => {
    console.log("Obteniendo la lista de tareas...");
    const response = await axios.get(uriTasks, settings);
    const tasks = response.data;
    setIncompleteTasks(tasks.filter((task) => !task.completed));
    setCompleteTasks(tasks.filter((task) => task.completed));
  };

  const handleCompletionToggle = async (taskId, completed) => {
    console.log(`Cambiando estado de la tarea con ID: ${taskId}...`);
    const payload = { completed };
    const res = await axios.put(`${uriTasks}/${taskId}`, payload, settings);
    setTaskList(res.data);
  };

  const handleDeleteTask = async (taskId) => {
    console.log(`Eliminando la tarea con ID: ${taskId}...`);
    await axios.delete(`${uriTasks}/${taskId}`, settings);
    taskHandler();
  };
  return (
    <HStack width={"100%"} align={"start"}>
      <VStack width={"50%"}>
        <Heading color={"whiteAlpha.500"}>
          Incomplete Tasks
          <Badge
            ml="10"
            colorScheme="green"
            fontSize={"1.5rem"}
            variant={"outline"}
            padding={"5px 10px"}
            borderRadius={"50%"}
          >
            {incompleteTasks.length}
          </Badge>
        </Heading>
        <List width={"90%"}>
          {incompleteTasks.map((task) => (
            <ListItem
              key={task.id}
              width={"100%"}
              backgroundColor={"rgb(10,10,10)"}
              marginBottom={3}
            >
              <SlideFade offsetX="-40px" in={true}>
                <HStack justifyContent={"space-between"}>
                  <Box color={"white"}>{task.description}</Box>
                  <Box>
                    <Button
                      colorScheme="yellow"
                      variant={"outline"}
                      onClick={() => handleCompletionToggle(task.id, true)}
                    >
                      Incomplete
                    </Button>

                    <Button
                      colorScheme="red"
                      variant={"outline"}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </HStack>
              </SlideFade>
            </ListItem>
          ))}
        </List>
      </VStack>
      <VStack width={"50%"}>
        <Heading color={"whiteAlpha.500"}>
          Complete Tasks
          <Badge
            ml="10"
            colorScheme="green"
            fontSize={"1.5rem"}
            variant={"outline"}
            padding={"5px 10px"}
            borderRadius={"50%"}
          >
            {completeTasks.length}
          </Badge>
        </Heading>
        <List width={"90%"}>
          {completeTasks.map((task) => (
            <ListItem
              key={task.id}
              width={"100%"}
              backgroundColor={"rgb(10,10,10)"}
              marginBottom={3}
            >
              <SlideFade offsetX="-40px" in={true}>
                <HStack justify={"space-between"}>
                  <Box color={"white"}>{task.description}</Box>
                  <Box>
                    <Button
                      colorScheme="green"
                      variant={"outline"}
                      onClick={() => handleCompletionToggle(task.id, false)}
                    >
                      complete
                    </Button>

                    <Button
                      colorScheme="red"
                      variant={"outline"}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </HStack>
              </SlideFade>
            </ListItem>
          ))}
        </List>
      </VStack>
    </HStack>
  );
};

export default TaskList;
