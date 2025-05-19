import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { YMaps } from "@pbe/react-yandex-maps";

import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <YMaps>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </YMaps>
);
