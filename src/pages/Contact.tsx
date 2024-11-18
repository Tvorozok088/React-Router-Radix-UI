import ContactForm from "../components/ContactForm";
import { Flex } from "@radix-ui/themes";



export default function Contact() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"15px"}
    >
      <ContactForm />
    </Flex>
  );
}
