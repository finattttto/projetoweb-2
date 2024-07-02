import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Checkbox, Input, Text, Spinner, Flex, useToast } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import CarrinhoService from '@/services/CarrinhoService';
import { Carrinho } from '@/commons/interfaces';
import ProductCarrinhoCard from '@/components/CardCarrinho';
import AuthService from '@/services/AuthService';
import { useNavigate } from 'react-router-dom';

const CarrinhoPage: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Carrinho[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const toast = useToast()

  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    try {
      const data = await CarrinhoService.getCarrinho();
      setCarrinho(data);
      setTotal(data.reduce((acc, d) => acc + d.produto.preco * d.quantidade, 0));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar o carrinho: ', error);
      setLoading(false);
    }
  };

  const onClickConfirmar = () => {
    if(AuthService.isAuthenticaded()){
      navigate(`/pagamento`);
    }else {
      toast({
        title: 'Aviso.',
        description: "Faça login para continuar.",
        status: 'info',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(`/login/true`);
    }
  };


  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box className="root">
      <NavBar />
      <Box className="content" p={4} display="flex" justifyContent="center" pt="90px">
        {carrinho && carrinho.length > 0 ? (
          <Stack spacing={2} width="4xl">
            {carrinho.map((car) => (
              <ProductCarrinhoCard key={car.produto.id} carrinho={car} onEvent={fetchCarrinho} />
            ))}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontSize="20px" mb={4}>Resumo do Pedido</Text>
              <Text fontSize="3xl" mb={2}>Valor Total: R${total.toFixed(2)}</Text>
              <Flex justifyContent="flex-end" mt={4}>
                <Button colorScheme="blue" onClick={onClickConfirmar}>
                  Confirmar Compra
                </Button>
              </Flex>
            </Box>
          </Stack>
        ) : (
          <Box mt={4} textAlign="center">
            Seu carrinho está vazio.
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default CarrinhoPage;
