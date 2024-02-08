import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Messanjar from "./components/messanjar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/messanjar" element={<Messanjar />} />
          <Route path="/" element={<Login />} />
          <Route path="/messanjar/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
