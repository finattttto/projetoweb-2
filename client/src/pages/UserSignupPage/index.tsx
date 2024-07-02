import { ChangeEvent, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import { IUserSigup } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import { Box, Button, Grid, GridItem, FormControl, FormLabel, Heading, Alert, AlertIcon, Center, Image, useToast } from "@chakra-ui/react";
import logo from "@/assets/book-logo.png";


export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
  };

  const onClickSignup = async () => {
    setPendingApiCall(true);

    event?.preventDefault();
    const user: IUserSigup = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.signup(user);
    if (response.status === 200 || response.status === 201) {
      setApiSuccess("Cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setApiError("Falha ao cadastrar o usuário!");
      if (response.data.validationErrors) {
        setErrors(response.data.validationErrors);
      }
      setPendingApiCall(false);
    }
  };

  return (
    <>
      <Center height="100vh" width="100vw" bg="gray.100">
        <Grid templateColumns="repeat(3, 1fr)" gap={0} width="100%" height="100%">
          <GridItem colSpan={1} bg="white" display="flex" justifyContent="center" alignItems="center">
            <Box height="100%" width="100%">
              <Image
                src="https://ae01.alicdn.com/kf/Hd8ead3e2827a4051b6d9979543041871k/Biblioteca-livros-coloridos-prateleira-banner-backdrops-fotografia-estudantes-fundos-para-crian-as-festa-de-anivers-rio.jpg"
                alt="Imagem biblioteca"
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          </GridItem>
          <GridItem colSpan={1} bg="white" display="flex" justifyContent="center" alignItems="center">
            <Box p={8} width="100%" maxW="md">
              <Box display="flex" justifyContent="center" alignItems="flex-start" mb={4}>
                <Link to="/" className="navbar-brand">
                  <img src={logo} width="45" alt="LIVRO" />
                </Link>
              </Box>
              <Heading as="h1" size="lg" textAlign="center" mb={6}>Cadastro</Heading>
              <form>
                <FormControl id="name" mb={4}>
                  <FormLabel>Informe o seu nome</FormLabel>
                  <Input
                    id="displayName"
                    name="displayName"
                    type="text"
                    placeholder="Informe o seu nome"
                    className="form-control"
                    onChange={onChange}
                    value={form.displayName}
                    hasError={errors.displayName ? true : false}
                    error={errors.displayName}
                  />
                </FormControl>
                <FormControl id="username" mb={4}>
                  <FormLabel>Informe o seu usuário</FormLabel>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Informe o seu usuário"
                    className="form-control"
                    onChange={onChange}
                    value={form.username}
                    hasError={errors.username ? true : false}
                    error={errors.username}
                  />
                </FormControl>
                <FormControl id="password" mb={4}>
                  <FormLabel>Informe a senha</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******"
                    className="form-control"
                    onChange={onChange}
                    value={form.password}
                    hasError={errors.password ? true : false}
                    error={errors.password}
                  />
                </FormControl>
                <ButtonWithProgress
                  onClick={onClickSignup}
                  disabled={pendingApiCall}
                  pendingApiCall={pendingApiCall}
                  text="Cadastrar"
                />
              </form>
              <Center mt={4}>
                <Link to="/login">Ir para tela de login</Link>
              </Center>
            </Box>
          </GridItem>
          <GridItem colSpan={1} bg="white" display="flex" justifyContent="center" alignItems="center">
            <Box height="100%" width="100%">
              <Image
                src="https://ae01.alicdn.com/kf/Hd8ead3e2827a4051b6d9979543041871k/Biblioteca-livros-coloridos-prateleira-banner-backdrops-fotografia-estudantes-fundos-para-crian-as-festa-de-anivers-rio.jpg"
                alt="Imagem biblioteca"
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          </GridItem>
        </Grid>
      </Center>
    </>
  );
}
