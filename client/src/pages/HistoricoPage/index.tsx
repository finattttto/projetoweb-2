import React, { useEffect, useState } from 'react';
import {
  Box, Spinner, useToast, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import PedidoService from '@/services/PedidoService';
import { useNavigate } from 'react-router-dom';

const HistoricoPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const result = await PedidoService.findByUser();
      setPedidos(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar os pedidos: ', error);
      setLoading(false);
    }
  };


  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!pedidos?.length) {
    return (
      <Box className="root">
        <Box className='content'>
          <Box mt={4} textAlign="center" pt="90px">
            Você ainda não tem nenhum pedido.
          </Box>
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box className="root">
      <Box className="text-center" pt="90px">
        <h1 className="h3 mb-3 fw-normal">Histório de pedidos</h1>
      </Box>
      <Box className="content" p={4} display="flex" justifyContent="center">
        <TableContainer w={{ base: "100%", lg: "66%" }}>
          <Table variant='simple'>
            <TableCaption>Esses foram todos os pedidos encontrados!</TableCaption>
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Data</Th>
                <Th>Descricao</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pedidos.map((pedido) => (
                <Tr key={pedido.id}>
                  <Td>{pedido.id}</Td>
                  <Td>{new Date(pedido.data).toLocaleDateString()}</Td>
                  <Td>{pedido.descricao}</Td>
                  <Td isNumeric>{pedido.totalPedido.toFixed(2).replace('.', ',')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
  );
};

export default HistoricoPage;
