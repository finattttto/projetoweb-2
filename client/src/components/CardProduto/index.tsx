import React from 'react';
import { IProduct } from '@/commons/interfaces';
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Button, Image, Divider, CardFooter, ButtonGroup, Spacer, Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import CarrinhoService from '@/services/CarrinhoService';

interface ProductCardAux {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardAux> = ({ product }) => {

  const navigate = useNavigate();
  
  const toast = useToast();

  const onClickCard = () => {
    navigate(`/produto/${product.id}`);
  };

  const addToCarrinho = async (event) => {
    event.stopPropagation();
    await CarrinhoService.addToCarrinho(product, 1, toast);
  };

  const precoFormatado = product.preco.toFixed(2).replace('.', ',');

  return (
    <Card maxW='sm' cursor="pointer" onClick={onClickCard}>
          <CardBody as={Flex} direction="column" className='pb-0'>
      <Image
        src={product.imagem}
        alt={product.nome}
        borderRadius='lg'
        h="400px"
      />
      <Stack mt='4' spacing='1' flex='1'>
        <Heading size='md'>{product.nome}</Heading>
        <Text noOfLines={2}>
          {product.descricao}
        </Text>
        <Flex mt='auto' justifyContent='flex-end'>
          <Text color='blue.600' fontSize='2xl'>
          R$ {precoFormatado}
          </Text>
        </Flex>
      </Stack>
    </CardBody>
      <Divider p="0" m="0" />
      <CardFooter display="flex" justifyContent="end">
        <ButtonGroup spacing='1'>
          <Button variant='solid' colorScheme='blue' rightIcon={<AddIcon />} onClick={addToCarrinho}>
            Carrinho
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
