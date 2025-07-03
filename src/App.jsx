import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SiparisForm from "./SiparisForm";
import Success from "./Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/siparis" element={<SiparisForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
