import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { TabNav } from "@radix-ui/themes";

import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <TabNav.Root justify={"center"}>
      <TabNav.Link asChild active={pathname === "/"}>
        <NavLink to={"/"}>Home</NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === "/products"}>
        <NavLink to={"/products"}>Products</NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === "/contact"}>
        <NavLink to={"/contact"}>Contact</NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === "/profile"}>
        <NavLink to={"/profile"}>
          <PersonIcon />
        </NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === "/login"}>
        <NavLink
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
          }}
          to={"/login"}
        >
          <ExitIcon />
        </NavLink>
      </TabNav.Link>
    </TabNav.Root>
  );
};

export default Header;
