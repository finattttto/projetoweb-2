import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, GridItem, Input, FormControl, FormLabel, Heading, Alert, AlertIcon, Center, Image, useToast } from "@chakra-ui/react";
import { IUserLogin } from "@/commons/interfaces";
import AuthService from "@/services/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import logo from "@/assets/book-logo.png";

export function LoginPage() {
  const { pagamento } = useParams<{ pagamento: string }>();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const toast = useToast()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onClickLogin = async () => {
    setPendingApiCall(true);
    event?.preventDefault();
    const user: IUserLogin = {
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.login(user);
    if (response.status === 200) {
      toast({
        title: 'Sucesso.',
        description: "Login concluido com sucesso.",
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      })
      setTimeout(() => {
        pagamento ? navigate("/pagamento") : navigate("/");
      }, 500);
    } else {
      setPendingApiCall(false);
      toast({
        title: 'Aviso.',
        description: "Falha ao autenticar o usuário!",
        status: 'warning',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    }
  };

  return (
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
            <Heading as="h1" size="lg" textAlign="center" mb={6}>Login</Heading>
            <form>
              <FormControl id="username" mb={4}>
                <FormLabel>Informe o usuário</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="Informe o usuário"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="password" mb={4}>
                <FormLabel>Informe a senha</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Informe a senha"
                  onChange={onChange}
                />
              </FormControl>
              <ButtonWithProgress
                onClick={onClickLogin}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text="Login"
              />
            </form>
            <Center mt={4}>
              <Link to="/signup">Deseja cadastrar-se</Link>
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
  );
}
