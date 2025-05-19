import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CartProductT, ProductT } from "./Products";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Select,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  PaperPlaneIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Slide, toast } from "react-toastify";
import { User } from "./Profile";

type Props = { addToCart: (product: ProductT | CartProductT) => void };

export default function FullProduct({ addToCart }: Props) {
  const { id } = useParams();
  const email = localStorage.getItem("email") || "";
  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<ProductT | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewProducts, setViewProducts] = useState<ProductT[]>(
    localStorage.getItem(email)
      ? JSON.parse(localStorage.getItem(email) as string)
      : []
  );
  const [text, setText] = useState<string>("");
  const [rate, setRate] = useState<string>("1");
  const navigate = useNavigate();
  const stars = [...new Array(5)];
  const rating = product?.rating
    ? Math.round(
        product?.rating.reduce((sum, item) => {
          return sum + item.rate;
        }, 0) / (product?.rating.length || 1)
      )
    : 0;
  const lastId =
    product?.rating && product?.rating.length > 0
      ? product.rating[product.rating.length - 1].id
      : 0;

  function addReview() {
    if (product?.rating) {
      fetch(`https://9ef2d180e93994dd.mokky.dev/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          rating: [
            ...product?.rating,
            { id: lastId + 1, name: user?.fullName, rate: +rate, text: text },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {getProduct()});
    }
  }

  function getProduct(){
    setLoading(true);
    fetch(`https://9ef2d180e93994dd.mokky.dev/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setViewProducts((prev) => [...prev, json]);
      })
      .catch(() => navigate("/error"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    localStorage.setItem(email, JSON.stringify(viewProducts));
  }, [viewProducts]);

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

  useEffect(() => {
    getProduct()
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
      mt={"50px"}
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
          rating >= index + 1 ? (
            <StarFilledIcon key={index} />
          ) : (
            <StarIcon key={index} />
          )
        )}
      </Flex>
      <Flex direction={"column"} gap={"2"}>
        {product.rating.map((item) => {
          return (
            <Box width="350px" key={item.id}>
              <Card size="1">
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    radius="full"
                    fallback={item.name[0].toUpperCase()}
                    color="indigo"
                  />
                  <Box width={"100%"}>
                    <Flex align={"center"} justify={"between"}>
                      <Text as="div" size="2" weight="bold">
                        {item.name}
                      </Text>
                      <Flex align={"center"} gap={"1"}>
                        <Text as="div" size="2" weight="bold">
                          {item.rate}
                        </Text>
                        <StarFilledIcon />
                      </Flex>
                    </Flex>

                    <Text as="div" size="2" color="gray">
                      {item.text}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          );
        })}
      </Flex>
      <Flex gap={"3"}>
        <TextArea
          size={"1"}
          style={{
            height: "40px",
            minHeight: "40px",
            width: "100%",
            minWidth: "230px",
          }}
          placeholder="Leave a review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select.Root
          size="3"
          defaultValue="1"
          value={rate}
          onValueChange={(value) => setRate(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="1">1</Select.Item>
            <Select.Item value="2">2</Select.Item>
            <Select.Item value="3">3</Select.Item>
            <Select.Item value="4">4</Select.Item>
            <Select.Item value="5">5</Select.Item>
          </Select.Content>
        </Select.Root>
        <IconButton size={"3"} onClick={addReview}>
          <PaperPlaneIcon />
        </IconButton>
      </Flex>
      <Flex gap={"3"}>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeftIcon /> Back to Products
        </Button>

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
