import "@/utils/themePreloader";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/tailwind.css";
import App from "./App";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
