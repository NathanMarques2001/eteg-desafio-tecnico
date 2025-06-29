import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import CustomerForm from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomerForm />
  </StrictMode>
);
