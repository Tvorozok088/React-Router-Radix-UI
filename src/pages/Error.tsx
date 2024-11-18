import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"5px"}
    >
      <Heading size={"8"} color="red">
        Server Error
      </Heading>
      <Text>
        Technical work is underway. We are already solving the problem
      </Text>
      <Link to={"/"}>
        <Button>
          <ArrowLeftIcon /> Back to Home
        </Button>
      </Link>
    </Flex>
  );
}
