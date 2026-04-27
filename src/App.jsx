import { Route, Routes } from "react-router-dom";
import AddListing from "./pages/AddListing";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}
