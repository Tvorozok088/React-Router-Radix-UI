import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartProductT, ProductT } from "./Products";
import {
  AspectRatio,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Slide, toast } from "react-toastify";

type Props = { addToCart: (product: ProductT | CartProductT) => void };

export default function FullProduct({ addToCart }: Props) {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductT | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const stars = [...new Array(5)];

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch(() => navigate("/error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Flex
        justify={"center"}
        align={"center"}
        minHeight={"70vh"}
        direction={"column"}
        gap={"15px"}
      >
        <Spinner size={"3"} />
      </Flex>
    );
  }

  if (!product) {
    return (
      <Flex
        justify={"center"}
        align={"center"}
        minHeight={"70vh"}
        direction={"column"}
        gap={"5px"}
      >
        <Heading size={"8"}>Product Not Found</Heading>
        <Link to={"/products"}>
          <Button>
            <ArrowLeftIcon /> Back to Products
          </Button>
        </Link>
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
      <Heading size={"4"}>{product.title}</Heading>
      <div className="Container">
        <AspectRatio ratio={16 / 9}>
          <img
            className="Image"
            src={product.image}
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio>
      </div>
      <div style={{ maxWidth: "400px", textAlign: "center" }}>
        <Text>{product.description}</Text>
      </div>
      <Flex gap={"1"}>
        {stars.map((_, index) =>
          product.rating.rate >= index + 1 ? (
            <StarFilledIcon key={index} />
          ) : (
            <StarIcon key={index} />
          )
        )}
      </Flex>
      <Flex gap={"3"}>
        <Link to={"/products"}>
          <Button variant="outline">
            <ArrowLeftIcon /> Back to Products
          </Button>
        </Link>
        <Button
          onClick={() => {
            addToCart(product);
            toast("Added to cart", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: 0,
              theme: "light",
              type: "success",
              transition: Slide,
            });
          }}
        >
          <ArchiveIcon /> Add
        </Button>
      </Flex>
    </Flex>
  );
}
