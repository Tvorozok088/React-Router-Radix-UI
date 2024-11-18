import { ArchiveIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Inset,
  Text,
} from "@radix-ui/themes";

import { CartProductT, ProductT } from "../pages/Products";
import { Link } from "react-router-dom";
import { Slide, toast } from "react-toastify";

type Props = {
  product: ProductT;
  addToCart: (product: ProductT | CartProductT) => void;
};

export default function Product({ product, addToCart }: Props) {
  return (
    <Box width="240px">
      <Card size="2">
        <Link to={`/products/${product.id}`}>
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={product.image}
              alt="Bold typography"
              style={{
                display: "block",
                objectFit: "contain",
                width: "100%",
                height: 140,
                backgroundColor: "white",
              }}
            />
          </Inset>
        </Link>
        <Heading size={"2"} className="product-title">
          {product.title}
        </Heading>
        <Flex justify={"between"} align={"center"} gap={"2"}>
          <Text>{product.price} $</Text>
          <Button
            onClick={() => {
              addToCart(product);
              toast('Added to cart', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "light",
                type: 'success',
                transition: Slide,
              });
            }}
          >
            <ArchiveIcon /> Add
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
