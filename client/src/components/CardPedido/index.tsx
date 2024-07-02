// components/PedidoCard.tsx
import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

const CardPedido: React.FC<{ pedido: any }> = ({ pedido }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl">Pedido #{pedido.id}</Text>
      <Text>Status: {pedido.status}</Text>
      <Stack spacing={2} mt={2}>
        {pedido.itens.map((item: any) => (
          <Box key={item.id}>
            <Text>{item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: R${item.preco}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CardPedido;
