import {
  Blockquote,
  Container,
  Flex,
  Heading,
  Separator,
  Strong,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { ProductT } from "./Products";

type Props = {};
export type User = { id: number; fullName: string; email: string };
export default function Profile({}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const email = localStorage.getItem("email")||'';
  const address = localStorage.getItem(`${email}-address`)

  const viewProducts = localStorage.getItem(email)
    ? JSON.parse(localStorage.getItem(email) as string)
    : [];

  const renderProducts = viewProducts
    .reverse()
    .map((product: ProductT, index: number) => (
      <Product product={product} addToCart={null} key={index} />
    ));

  useEffect(() => {
    fetch("https://9ef2d180e93994dd.mokky.dev/auth_me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((json) => setUser(json));
  }, []);

  if (!user) {
    return (
      <Flex
        justify={"center"}
        align={"center"}
        minHeight={"70vh"}
        direction={"column"}
        gap={"15px"}
      >
        Loading...
      </Flex>
    );
  }

  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"15px"}
    >
      <Heading size={"8"} mt={"8"}>
        {user.fullName}
      </Heading>
      <Flex direction={'column'} gap={'3'}>
      
      <Blockquote>{user.email}</Blockquote>
      <Blockquote><Strong>Selected address: </Strong>{address || 'Address not selected'}</Blockquote></Flex>
      <Container size="4" mt={"5"}>
        <Separator my="3" size="4" />
        <Heading size={"6"} mb={"6"}>
          Recent Products:
        </Heading>
        <Flex justify={"between"} wrap={"wrap"} gap={"3"}>
          {renderProducts}
        </Flex>
      </Container>
    </Flex>
  );
}
