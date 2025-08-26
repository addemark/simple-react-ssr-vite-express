import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import "./i18n"; // Initialize i18n

hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
