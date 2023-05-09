import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Products from "./pages/Produtos";
import Home from "./pages/Home";
import Pag404 from "./pages/404";

const Router = () => {
    return (
        <Routes>
            <Route path="/produtos" element={<Products/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="*" element={<Pag404/>} />
        </Routes>
    )
}

export default Router