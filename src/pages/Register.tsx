import * as Form from "@radix-ui/react-form";
import {
  Blockquote,
  Button,
  Flex,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function Register({}: Props) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event: React.SyntheticEvent) {
    const elem = event.target as HTMLInputElement;
    setFormValues((prev) => ({ ...prev, [elem.id]: elem.value }));
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (
      formValues.email.trim() != "" &&
      formValues.fullName.trim() != "" &&
      formValues.password.trim() != ""
    ) {
      fetch("https://9ef2d180e93994dd.mokky.dev/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.error) {
            alert("User is already registered");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            return;
          }
          localStorage.setItem("token", json.token);
          localStorage.setItem("email",json.data.email);
          navigate("/");
        });
    }
  }
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"15px"}
    >
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="text">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label>Your name</Form.Label>
          </div>
          <Form.Control asChild>
            <TextField.Root
              placeholder="Enter your name"
              onChange={handleChange}
              value={formValues.fullName}
              id="fullName"
            ></TextField.Root>
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label>Email</Form.Label>
          </div>
          <Form.Control asChild>
            <TextField.Root
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              value={formValues.email}
              id="email"
            ></TextField.Root>
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label>Password</Form.Label>
          </div>
          <Form.Control asChild>
            <TextField.Root
              placeholder="Enter your password"
              type="password"
              onChange={handleChange}
              value={formValues.password}
              id="password"
            ></TextField.Root>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button size={"2"} style={{ width: "100%" }} type="submit">
            Submit
          </Button>
        </Form.Submit>
      </Form.Root>
      <Blockquote>
        You have account? <Link to={"/login"}>Login</Link>
      </Blockquote>
    </Flex>
  );
}
