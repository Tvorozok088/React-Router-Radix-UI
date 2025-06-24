import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products, { CartProductT, ProductT } from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { IconButton, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import FullProduct from "./pages/FullProduct";
import Error from "./pages/Error";
import { Slide, toast } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  const email = localStorage.getItem("email") || "";
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cartProducts, setCartProducts] = useState<CartProductT[]>(
    getCartProduct()
  );

  const whiteList = ["/register", "/login", "/error"];

  const location = useLocation();

  useEffect(() => {
    if (email) {
      localStorage.setItem(`${email}-cart`, JSON.stringify(cartProducts));
    }
  }, [cartProducts, email]);

  useEffect(() => {
    getScroll();
    function saveScroll() {
      localStorage.setItem("scroll", String(window.scrollY));
    }
    window.addEventListener("scroll", saveScroll);
    return () => {
      window.removeEventListener("scroll", saveScroll);
    };
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function getScroll() {
    const saveScroll = localStorage.getItem("scroll");
    if (saveScroll) {
      window.scrollTo(0, +saveScroll);
      return +saveScroll;
    }
    return 0;
  }

  function addToCart(product: ProductT | CartProductT) {
    const productInCart = cartProducts.find((item) => item.id === product.id);
    if (productInCart) {
      setCartProducts((prev) =>
        prev.map((item) => {
          if (item.id === product.id) {
            item.count++;
          }
          return item;
        })
      );
    } else {
      setCartProducts((prev) => [...prev, { ...product, count: 1 }]);
    }
  }

  function minusCartProduct(product: CartProductT) {
    setCartProducts((prev) =>
      prev.map((item) => {
        if (item.id === product.id) {
          item.count--;
        }
        return item;
      })
    );
  }

  function getCartProduct() {
    const saveCart = localStorage.getItem(`${email}-cart`);
    if (saveCart) {
      return JSON.parse(saveCart);
    }
    return [];
  }

  function deleteCartProduct(product: CartProductT) {
    setCartProducts((prev) => prev.filter((item) => item.id !== product.id));
    toast("Product deleted", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "light",
      type: "info",
      transition: Slide,
    });
  }

  return (
    <Theme accentColor="orange" radius="large" appearance={theme}>
      {!whiteList.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products
                addToCart={addToCart}
                cartProducts={cartProducts}
                minusCartProduct={minusCartProduct}
                deleteCartProduct={deleteCartProduct}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route path="/error" element={<Error />} />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <FullProduct addToCart={addToCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <IconButton onClick={toggleTheme} className="icon-btn">
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Theme>
  );
}

export default App;
