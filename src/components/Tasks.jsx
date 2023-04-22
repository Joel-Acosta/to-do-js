import {
  HStack,
  Heading,
  Badge,
  VStack,
  FormLabel,
  Input,
  Avatar,
  Button,
  FormControl,
  InputRightElement,
  InputGroup,
  ListItem,
  UnorderedList,
  Box,
  Checkbox,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Tasks = ({ token }) => {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  useEffect(() => {
    let controller = new AbortController();
    userNameHandler();
    taskHandler();
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

  const counters = (data) => {
    let completeCounter = 0;
    let incompleteCounter = 0;
    if (data) {
      console.log(data);
      data.map((i) => {
        i.completed ? completeCounter++ : incompleteCounter++;
      });
      setCompleteCount(completeCounter);
      setIncompleteCount(incompleteCounter);
    }
  };

  const taskHandler = async () => {
    console.log("Obteniendo la lista de tareas...");
    const response = await axios.get(uriTasks, settings);
    setTaskList(response.data);
    counters(response.data);
  };

  //func que crea una nueva tarea
  const addTask = async () => {
    if (task !== "") {
      const payload = {
        description: task,
      };
      console.log("Agregando una nueva tarea...");
      await axios.post(uriTasks, payload, settings);
      taskHandler();
    }
  };

  const handleCompletionToggle = async (taskId, completed) => {
    const payload = {
      completed,
    };

    try {
      console.log(`Cambiando estado de la tarea con ID: ${taskId}...`);
      await axios.put(`${uriTasks}/${taskId}`, payload, settings);
      taskHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      console.log(`Eliminando la tarea con ID: ${taskId}...`);
      await axios.delete(`${uriTasks}/${taskId}`, settings);
      taskHandler();
    } catch (error) {
      console.log(error);
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
      h={"100vh"}
      bgColor={"rgb(30,30,30)"}
    >
      <HStack
        width={"100%"}
        h={100}
        color={"wheat"}
        bgColor={"black"}
        paddingTop={15}
        paddingRight={5}
        justifyContent={"flex-end"}
      >
        <h3>{name}</h3>
        <Avatar bg="teal.500" />
        <Button colorScheme="red" onClick={logOutHandler}>
          Log out
        </Button>
      </HStack>
      <Box width={"50%"} marginBottom={30} h={"20%"}>
        <Heading color={"grey"} textAlign={"center"} marginBottom={30}>
          ToDo List
        </Heading>
        <FormControl
          bgColor={"rgb(40,40,40)"}
          padding={5}
          borderRadius={5}
          h={"70%"}
        >
          <FormLabel fontSize={"2rem"}> Add a New Task</FormLabel>
          <InputGroup>
            <Input
              type="text"
              variant="outline"
              fontSize={"1.5rem"}
              borderColor={"grey"}
              placeholder="ex: excercise"
              _placeholder={{ opacity: 0.4, color: "white" }}
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <InputRightElement width="5rem">
              <Button
                type="button"
                h="100%"
                size="lg"
                variant={"outline"}
                colorScheme="green"
                onClick={addTask}
              >
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <HStack
        w={"100%"}
        height={"50vh"}
        spacing={3}
        padding={15}
        justifyContent={"space-around"}
      >
        <Box width={"45%"} bgColor={"rgb(30,30,30)"} padding={4} h={"100%"}>
          <Heading color={"grey"} textAlign={"center"} marginBottom={30}>
            Yet to complete
            <Badge
              ml="10"
              colorScheme="green"
              fontSize={"1.5rem"}
              variant={"outline"}
              padding={"5px 10px"}
              borderRadius={"50%"}
            >
              {incompleteCount}
            </Badge>
          </Heading>

          <UnorderedList
            overflow={"scroll"}
            scrollBehavior={"none"}
            h={"100%"}
            spacing={4}
            css={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              //oculta el scroll bar en la lista de tareas
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {taskList.length > 0 &&
              taskList.map(
                (item) =>
                  !item.completed && (
                    <ListItem
                      key={item.id}
                      fontSize={22}
                      borderRadius={7}
                      bgColor={"rgb(220,220,220)"}
                      h={"15%"}
                    >
                      <HStack
                        spacing={4}
                        alignItems="center"
                        paddingLeft={3}
                        h={"100%"}
                        fontSize={"1.8rem"}
                      >
                        <Checkbox
                          alignItems="center"
                          size="lg"
                          borderColor={"red"}
                          isChecked={item.completed}
                          onChange={(e) =>
                            handleCompletionToggle(item.id, e.target.checked)
                          }
                        />
                        <Box flexGrow={1} alignItems="center">
                          {item.description}
                        </Box>
                        <Button
                          size="lg"
                          h={"100%"}
                          position={"relative"}
                          right={-22}
                          colorScheme={item.completed ? "green" : "yellow"}
                          onClick={() =>
                            handleCompletionToggle(item.id, !item.completed)
                          }
                        >
                          {item.completed ? "Completed" : "Not Completed"}
                        </Button>
                        <Button
                          size="lg"
                          h={"100%"}
                          colorScheme="red"
                          onClick={() => handleDeleteTask(item.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </ListItem>
                  )
              )}
          </UnorderedList>
        </Box>
        <Box width={"45%"} bgColor={"rgb(30,30,30)"} padding={4} h={"100%"}>
          <Heading color={"grey"} textAlign={"center"} marginBottom={30}>
            Completed
            <Badge
              ml="10"
              colorScheme="green"
              fontSize={"1.5rem"}
              variant={"outline"}
              padding={"5px 10px"}
              borderRadius={"50%"}
            >
              {completeCount}
            </Badge>
          </Heading>

          <UnorderedList
            overflow={"scroll"}
            scrollBehavior={"none"}
            h={"100%"}
            spacing={4}
            css={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              //oculta el scroll bar en la lista de tareas
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {taskList.length > 0 &&
              taskList.map(
                (item) =>
                  item.completed && (
                    <ListItem
                      key={item.id}
                      fontSize={22}
                      borderRadius={7}
                      bgColor={"rgb(220,220,220)"}
                      h={"15%"}
                    >
                      <HStack
                        spacing={4}
                        alignItems="center"
                        paddingLeft={3}
                        h={"100%"}
                        fontSize={"1.8rem"}
                      >
                        <Checkbox
                          alignItems="center"
                          size="lg"
                          borderColor={"red"}
                          isChecked={item.completed}
                          onChange={(e) =>
                            handleCompletionToggle(item.id, e.target.checked)
                          }
                        />
                        <Box flexGrow={1} alignItems="center">
                          {item.description}
                        </Box>
                        <Button
                          size="lg"
                          h={"100%"}
                          position={"relative"}
                          right={-22}
                          colorScheme={item.completed ? "green" : "yellow"}
                          onClick={() =>
                            handleCompletionToggle(item.id, !item.completed)
                          }
                        >
                          {item.completed ? "Completed" : "Not Completed"}
                        </Button>
                        <Button
                          size="lg"
                          h={"100%"}
                          colorScheme="red"
                          onClick={() => handleDeleteTask(item.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </ListItem>
                  )
              )}
          </UnorderedList>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Tasks;
