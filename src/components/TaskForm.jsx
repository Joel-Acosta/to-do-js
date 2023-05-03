/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";

const TaskForm = ({ addTask, task, setTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      addTask(task);
      setTask("");
    }
  };

  return (
    <FormControl bgColor={"rgb(10,10,10)"} padding={5} borderRadius={5}>
      <FormLabel fontSize={"2rem"} color={"whiteAlpha.600"}>
        {" "}
        Add a New Task
      </FormLabel>
      <InputGroup>
        <Input
          type="text"
          color={"whiteAlpha.600"}
          variant="flushed"
          fontSize={"1.5rem"}
          borderColor={"whiteAlpha.600"}
          placeholder="ex: excercise"
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
            onClick={handleSubmit}
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default TaskForm;
