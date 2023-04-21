/* eslint-disable no-unused-vars */
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { Button, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const schema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
    lasttName: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().min(3, { message: "Name must be at least 3 characters" }),
    password: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
    confirmPassword: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const LoginBs = () => {
  const [siggned, setSiggned] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });
  console.log(isValid);

  const onSubmit = async (data) => {
    const URL = "https://todo-api.ctd.academy/v1";
    const path = siggned ? "/users/login" : "/users";
    let URI = URL + path;

    const payload = {
      firstName: data.firstName,
      lastName: data.lasttName,
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
      }
    } catch {
      (err) => console.log(err);
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "500px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <div className="mb-3">
        <FormLabel htmlFor="firstName" className="form-label" color="green">
          First name
        </FormLabel>
        <input
          {...register("firstName")}
          id="firstName"
          type="text"
          className="form-control"
        />
        <p
          className="text-danger"
          style={{
            visibility: !isValid && errors.firstName ? "visible" : "hidden",
          }}
        >
          #{errors.firstName?.message}{" "}
        </p>
      </div>

      <div className="mb-3">
        <FormLabel htmlFor="lasttName" className="form-label" color="green">
          Last name
        </FormLabel>
        <input
          {...register("lasttName")}
          id="lasttName"
          type="text"
          className="form-control"
        />
        <p
          className="text-danger"
          style={{
            visibility: !isValid && errors.lasttName ? "visible" : "hidden",
          }}
        >
          #{errors.lasttName?.message}{" "}
        </p>
      </div>

      <div className="mb-3">
        <FormLabel htmlFor="email" className="form-label" color="green">
          Email address
        </FormLabel>
        <input
          {...register("email")}
          id="email"
          type="text"
          className="form-control"
        />
        <p
          className="text-danger"
          style={{
            visibility: !isValid && errors.email ? "visible" : "hidden",
          }}
        >
          #{errors.email?.message}{" "}
        </p>
      </div>
      <div className="mb-3">
        <FormLabel htmlFor="password" className="form-label" color="green">
          Password
        </FormLabel>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="form-control"
        />
        <p
          className="text-danger"
          style={{
            visibility: !isValid && errors.password ? "visible" : "hidden",
          }}
        >
          #{errors.password?.message}{" "}
        </p>
      </div>
      <div className="mb-3">
        <FormLabel
          htmlFor="confirmPassword"
          className="form-label"
          color="green"
        >
          Confirm password
        </FormLabel>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          className="form-control"
        />
        <p
          className="text-danger"
          style={{
            visibility:
              !isValid && errors.confirmPassword ? "visible" : "hidden",
          }}
        >
          #{errors.confirmPassword?.message}{" "}
        </p>
      </div>

      <Button
        justifyContent={"center"}
        type="submit"
        variant="outline"
        colorScheme="green"
      >
        Register
      </Button>
    </form>
  );
};

export default LoginBs;
