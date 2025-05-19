import { Container, Flex, Skeleton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import { ToastContainer } from "react-toastify";

export type ProductT = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    id: number;
    rate: number;
    name: string;
    text: string;
  }[];
  title: string;
};
export type CartProductT = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    id: number;
    rate: number;
    name: string;
    text: string;
  }[];
  title: string;
  count: number;
};
type Props = {
  cartProducts: CartProductT[];
  addToCart: (product: ProductT | CartProductT) => void;
  minusCartProduct: (product: CartProductT) => void;
  deleteCartProduct: (product: CartProductT) => void;
};
export default function Products({
  cartProducts,
  addToCart,
  minusCartProduct,
  deleteCartProduct,
}: Props) {
  const [products, setProducts] = useState<ProductT[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>(
    getActiveCategory()
  );
  const [sort, setSort] = useState<"price" | "-price">("price");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("activeCategory", activeCategory);
  }, [activeCategory]);

  function getActiveCategory() {
    const saveCategory = localStorage.getItem("activeCategory");
    if (saveCategory) {
      return saveCategory;
    }
    return "all";
  }

  const navigate = useNavigate();

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton width={"240px"} height={"251px"} key={index}></Skeleton>
  ));

  const renderProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((product) => (
      <Product product={product} addToCart={addToCart} key={product.id} />
    ));

  const url =
    activeCategory === "all"
      ? "https://9ef2d180e93994dd.mokky.dev/products?"
      : `https://9ef2d180e93994dd.mokky.dev/products?category=${activeCategory}&`;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}sortBy=${sort}`)
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch(() => navigate("/error"))
      .finally(() => setLoading(false));
  }, [activeCategory, sort]);

  return (
    <Container size="4" mt={"5"}>
      <Filter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        cartProducts={cartProducts}
        addToCart={addToCart}
        minusCartProduct={minusCartProduct}
        deleteCartProduct={deleteCartProduct}
      />
      <Flex justify={"between"} wrap={"wrap"} gap={"3"}>
        {loading ? skeletons : renderProducts}
      </Flex>
      <ToastContainer />
    </Container>
  );
}
