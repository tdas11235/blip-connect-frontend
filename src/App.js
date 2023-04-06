import "./App.css";
import Home from "./components/Home";
import Services from "./components/Services";
import Contacts from "./components/Contact";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  localStorage.setItem("current", 0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
