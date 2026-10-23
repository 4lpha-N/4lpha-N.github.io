import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource/chakra-petch/latin-400.css";
import "@fontsource/chakra-petch/latin-700.css";
import "./index.css";
import App from "./App.tsx";
import AppShell from "./AppShell.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell>
        <App />
      </AppShell>
    </BrowserRouter>
  </StrictMode>,
);
