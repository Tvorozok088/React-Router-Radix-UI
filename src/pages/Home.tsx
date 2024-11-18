import { AspectRatio, Blockquote, Flex, Heading } from "@radix-ui/themes";
import AccordionDemo from "../components/Accordion";

export default function Home() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight={"70vh"}
      direction={"column"}
      gap={"15px"}
    >
      <Heading size={"8"}>Fake Store API</Heading>
      <Blockquote>
        Fake store rest API for your e-commerce or shopping website prototype
      </Blockquote>
      <div className="Container">
        <AspectRatio ratio={16 / 9}>
          <img
            className="Image"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio>
      </div>
      <AccordionDemo />
    </Flex>
  );
}
