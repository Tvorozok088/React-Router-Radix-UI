
import * as Form from "@radix-ui/react-form";

import { Button, TextArea, TextField } from "@radix-ui/themes";

const ContactForm = () => (
  <Form.Root className="FormRoot">
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
        <TextField.Root placeholder="Enter your name"></TextField.Root>
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
        <TextField.Root placeholder="Enter your email"></TextField.Root>
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="question">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label>Question</Form.Label>
      </div>
      <Form.Control asChild>
        <TextArea placeholder="Ask your question" />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <Button size={"2"} style={{ width: "100%" }}>
        Submit
      </Button>
    </Form.Submit>
  </Form.Root>
);

export default ContactForm;
