import CarrinhoPage from "@/pages/CarrinhoPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import ProductPage from "@/pages/ProdutoPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import PagamentoPage from "@/pages/PagamentoPage";
import HistoricoPage from "@/pages/HistoricoPage";

export function BaseRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/:pagamento" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/produto" element={<ProductPage />} />
      <Route path="/produto/:id" element={<ProductPage />} />
      <Route path="/carrinho" element={<CarrinhoPage />} />

      {/* Protected Routes */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/pagamento" element={<PagamentoPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
      </Route>
    </Routes>
  );
}
