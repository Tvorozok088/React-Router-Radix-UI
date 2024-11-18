import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"5px"}
    >
      <Heading size={"8"}>Not Found</Heading>
      <Link to={"/"}>
        <Button>
          <ArrowLeftIcon /> Back to Home
        </Button>
      </Link>
    </Flex>
  );
}
