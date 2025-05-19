import { Blockquote, Button, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleChange(event: React.SyntheticEvent) {
    const elem = event.target as HTMLInputElement;
    setFormValues((prev) => ({ ...prev, [elem.id]: elem.value }));
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (formValues.email.trim() != "" && formValues.password.trim() != "") {
      fetch("https://9ef2d180e93994dd.mokky.dev/auth", {
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
            alert("Check your login or password");
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            return;
          }
          console.log(json);
          localStorage.setItem("email",json.data.email);
          localStorage.setItem("token", json.token);
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
              id="email"
              value={formValues.email}
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
              id="password"
              value={formValues.password}
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
        You don't have account? <Link to={"/register"}>Register</Link>
      </Blockquote>
    </Flex>
  );
}
