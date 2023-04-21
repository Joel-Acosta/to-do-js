import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Box>
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8">
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5px"
            >
              Sign in to my ToDo
            </Heading>
          </VStack>
          <Card bg="#090d33" variant="outline" borderColor="#d8dee4" w="500px">
            <CardBody>
              <form>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm">Username or email address</FormLabel>
                    <Input
                      type="text"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Password</FormLabel>
                      <Button
                        as="a"
                        href="#"
                        variant="link"
                        size="xs"
                        color="#0969da"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Button>
                    </HStack>
                    <Input
                      type="password"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>

                  <Button type="submit" variant="outline" colorScheme="teal">
                    Log in
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card variant="outline" borderColor="#d0d7de">
            <CardBody>
              <Center>
                <HStack fontSize="sm" spacing="1">
                  <Text>New to ToDo?</Text>
                  <Link isExternal color="#0969da" href="#">
                    Create an account.
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
      <Center as="footer" mt="16">
        <HStack spacing="4" pt="2">
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Terms
          </Link>
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Privacy
          </Link>
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Security
          </Link>
          <Link isExternal href="#" fontSize="xs">
            Contact GitHub
          </Link>
        </HStack>
      </Center>
    </Box>
  );
}
