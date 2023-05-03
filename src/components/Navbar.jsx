/* eslint-disable react/prop-types */
import {
    HStack,
    Avatar,
    Button
  } from "@chakra-ui/react";
  
  const Navbar = ({ name, onLogout }) => {
    return (
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
        <Button colorScheme="red" variant={'outline'} onClick={onLogout}>
          Log out
        </Button>
      </HStack>
    );
  };
  
  export default Navbar;