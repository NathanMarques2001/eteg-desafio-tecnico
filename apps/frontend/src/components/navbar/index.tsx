// src/components/Navbar.tsx
import logo from "../../assets/logo.png";
import "./style.css";

export default function Navbar() {
  return (
    <nav id="navbar">
      <div id="navbar-container">
        <img src={logo} alt="logo eteg" id="navbar-logo" />
        <h1 id="navbar-title">John Doe</h1>
      </div>
    </nav>
  );
}
