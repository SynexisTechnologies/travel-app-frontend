import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider, ThemeContextProvider } from "@/shared";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <AuthProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthProvider>
);
