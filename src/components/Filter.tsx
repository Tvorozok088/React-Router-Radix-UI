import { Button, Flex, Select, Skeleton, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Cart from "./Cart";
import { CartProductT, ProductT } from "../pages/Products";

type Props = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sort: "asc" | "desc";
  setSort: (sort: "asc" | "desc") => void;
  search: string;
  setSearch: (search: string) => void;
  addToCart: (product: ProductT | CartProductT) => void;
  cartProducts: CartProductT[];
  minusCartProduct: (product: CartProductT) => void;
  deleteCartProduct: (product: CartProductT) => void;
};

export default function Filter({
  activeCategory,
  setActiveCategory,
  sort,
  setSort,
  search,
  setSearch,
  addToCart,
  cartProducts,
  minusCartProduct,
  deleteCartProduct,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton width={"110px"} height={"32px"} key={index}></Skeleton>
  ));

  const productsCount = cartProducts.length;

  const fullPrice = cartProducts.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  const renderCategories = categories.map((category) => (
    <Button
      variant={activeCategory === category ? "classic" : "outline"}
      onClick={() => setActiveCategory(category)}
      key={category}
    >
      {category}
    </Button>
  ));

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch(() => navigate("/error"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Flex align={"center"} justify={"between"} mb={"5"}>
      <Flex gap={"2"}>
        {loading ? (
          skeletons
        ) : (
          <>
            <Button
              variant={activeCategory === "all" ? "classic" : "outline"}
              onClick={() => setActiveCategory("all")}
            >
              All
            </Button>
            {renderCategories}
          </>
        )}
      </Flex>
      <Flex gap={"2"}>
        <TextField.Root
          placeholder="Search the products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Select.Root value={sort} onValueChange={setSort}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="asc">Asc</Select.Item>
            <Select.Item value="desc">Desc</Select.Item>
          </Select.Content>
        </Select.Root>
        <Cart
          addToCart={addToCart}
          cartProducts={cartProducts}
          fullPrice={fullPrice}
          productsCount={productsCount}
          minusCartProduct={minusCartProduct}
          deleteCartProduct={deleteCartProduct}
        />
      </Flex>
    </Flex>
  );
}
