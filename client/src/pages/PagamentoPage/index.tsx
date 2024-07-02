import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Spinner, Text, Flex, useToast } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import CarrinhoService from '@/services/CarrinhoService';
import { Carrinho, IPedido } from '@/commons/interfaces';
import PedidoService from '@/services/PedidoService';
import ProductPagamentoCard from '@/components/CardPagamento';

const PagamentoPage: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Carrinho[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const toast = useToast();

  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    try {
      const data: Carrinho[] = await CarrinhoService.getCarrinho();
      setCarrinho(data);
      setTotal(data.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar o carrinho: ', error);
      setLoading(false);
    }
  };

  const onClickConfirmar = async () => {
    if (!carrinho) return;

    const pedido: IPedido = {
      data: new Date(),
      descricao: "Pedido",
      itens: carrinho,
    };

    try {
      const response = await PedidoService.save(pedido);
      if (response?.status === 201) {
        toast({
          title: 'Sucesso',
          description: "Pedido realizado com sucesso!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        await CarrinhoService.limparCarrinho();
        setCarrinho(null);
        setTotal(0);
      } else {
        throw new Error('Erro ao salvar o pedido');
      }
    } catch (error) {
      toast({
        title: 'Erro.',
        description: "Ocorreu um erro ao salvar o pedido.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
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
            <Text fontSize="2xl" mb={4}>Resumo do Pedido</Text>
            {carrinho.map((car) => (
              <ProductPagamentoCard key={car.produto.id} carrinho={car} />
            ))}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontSize="2xl" mb={4}>Valor Total: R${total.toFixed(2)}</Text>
              <Flex justifyContent="flex-end" mt={4}>
                <Button colorScheme="blue" onClick={onClickConfirmar}>
                  Confirmar pagamento
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

export default PagamentoPage;
