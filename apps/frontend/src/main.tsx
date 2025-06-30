import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import CustomerForm from "./pages/home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomerForm />
  </StrictMode>
);
