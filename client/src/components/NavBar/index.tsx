import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/book-logo.png";
import AuthService from "@/services/AuthService";
import { Box, Button, CloseButton, Stack, Tooltip, Text, Wrap, WrapItem, Avatar, MenuButton, MenuList, MenuItem, Menu } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import "./style.css";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

export function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");

  const isLogado = AuthService.isAuthenticaded();

  useEffect(() => {
    setUser(localStorage.getItem("user")?.replace(/"/g, "") || null)
  }, []);

  const onClickCarrinho = () => {
    navigate(`/carrinho`);
  };

  const onClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickHistorico = () => {
    navigate("/historico");
  };

  return (
    <Box className="navbar-fixed-top bg-white shadow-sm mb-2">
      <Box className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="45" alt="LIVRO" />
          </Link>
          <Box className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <Box display="flex" alignItems="center">
              <Button
                rightIcon={<FaShoppingCart />}
                colorScheme="blue"
                variant="outline"
                onClick={onClickCarrinho}
              >
                Carrinho
              </Button>
              <Menu>
                <Tooltip ml="4" hasArrow label="Painel do usuário" bg="blue.600">
                  <MenuButton as={Button} variant="link">
                    <Avatar ml="4" name={user} src='' backgroundColor="" />
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  {isLogado ? (
                    <>
                      <MenuItem onClick={onClickHistorico}>Histórico de pedidos</MenuItem>
                      <MenuItem onClick={onClickLogout}>Sair</MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={onClickLogin}>Entrar</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </nav>
      </Box>
    </Box>
  );
}
