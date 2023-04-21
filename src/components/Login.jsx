import { Button, Heading, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useState } from "react";
import axios from "axios";

 const Login = () => {
  const [siggned, setSiggned] = useState(true);

  console.log(siggned);
  const iniValues = {};
  if (siggned) {
    iniValues.email = "";
    iniValues.password = "";
  } else {
    iniValues.firstName = "";
    iniValues.lastName = "";
    iniValues.email = "";
    iniValues.password = "";
  }

  const siggnedHandler = () => {
    setSiggned(!siggned);
  };

  const LoginHandler = async (data) => {
    const URL = "https://todo-api.ctd.academy/v1";
    const path = siggned ? "/users/login" : "/users";
    let URI = URL + path;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };
    console.log(config);
    try {
      const response = await axios.post(URI,payload, config);
      let resJS = response.data;

      if (resJS.jwt) {
        localStorage.setItem("jwt", resJS.jwt);
        location.reload()
      }
    } catch {
      (err) => console.log(err);
    }
    console.log(data);
  };

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  return (
    <Formik
      initialValues={iniValues}
      validationSchema={
        !siggned
          ? Yup.object({
              firstName: Yup.string("Enter you name")
                .required("First name required")
                .min(3, "Frist name is too short"),
              lastName: Yup.string("Enter you name")
                .required("Last name required")
                .min(3, "Last name is too short"),
              email: Yup.string("Enter you name")
                .email("Invalid email")
                .required("Email required"),
              password: Yup.string("Enter you name")
                .matches(passwordRules, {
                  message: "Please create a stronger password",
                })
                .required("Required"),
              /* confirmPassword: Yup
                            .string()
                            .oneOf([Yup.ref("password"), ''], "Passwords must match")
                            .required("Required"), */
            })
          : Yup.object({
              email: Yup.string("Enter you name")
                .email("Invalid email")
                .required("Email required"),
              password: Yup.string("Enter you name")
                .matches(passwordRules, {
                  message: "Please create a stronger password",
                })
                .required("Required"),
            })
      }
      onSubmit={(values) => {
        LoginHandler(values);
      }}
    >
      {(formik) => (
        <VStack
          as="form"
          mx="auto"
          w={{ base: "90%", md: 500 }}
          h="100vh"
          justifyContent={"center"}
          onSubmit={formik.handleSubmit}
        >
          <Heading>{siggned ? "Log in" : "Sign Up"}</Heading>

          {!siggned &&<TextField
            label="First Name"
            name="firstName"
            placeholder="Enter first name..."
          ></TextField>}

          {!siggned && <TextField
            label="Last Name"
            name="lastName"
            placeholder="Enter first name..."
          ></TextField>}

          <TextField
            label="Email"
            name="email"
            placeholder="Enter email..."
          ></TextField>
          <TextField
            label="password"
            name="password"
            placeholder="Enter password..."
          ></TextField>

          <Button type="submit" variant="outline" colorScheme="teal">
            {!siggned ? "Register" : "Log in"}
          </Button>
          <Button
            type="button"
            variant="outline"
            colorScheme="yellow"
            onClick={siggnedHandler}
          >
            {siggned
              ? "Don't have an account? create one"
              : "Already have an account, Log in"}
          </Button>
        </VStack>
      )}
    </Formik>
  );
};

export default Login;
