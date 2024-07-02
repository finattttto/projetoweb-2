import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '@/commons/interfaces';
import ProductService from '@/services/ProductService';
import { Box, Heading, Text, Image, Spinner, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer, ButtonGroup, Button, useToast } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import CarrinhoService from '@/services/CarrinhoService';
import AuthService from '@/services/AuthService';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await ProductService.findById(id as any);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setLoading(false);
    }
  };

  const addToCarrinho = async () => {
    await CarrinhoService.addToCarrinho(product, 1, toast);
  }

  const comprarAgora = async () => {
    await CarrinhoService.addToCarrinho(product);
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
  }

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!product) {
    return <Text>Produto não encontrado</Text>;
  }

  return (
    <>
      <NavBar />
      <Box padding="4" margin="auto" marginLeft="70px" >
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink >{product.categoria.nome}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>{product.nome}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box padding="4" maxWidth="4xl" margin="auto">
        <Flex direction="row" alignItems="center" justifyContent="space-between">
          <Image src={product.imagem} alt={product.nome} borderRadius="lg" height="500px" objectFit="cover" />
          <Flex direction="column" ml="4" flex="1" justifyContent="space-between" height="500px">
            <Box>
              <Heading>{product.nome}</Heading>
              <Text mt="2">{product.descricao}</Text>
            </Box>
            <Box>
              <Text color='blue.600' fontSize='5xl'>
                R$ {product.preco}
              </Text>
              <ButtonGroup w="100%" spacing='2' mt="2">
                <Button variant='outline' colorScheme='blue' onClick={addToCarrinho}>
                  Adicionar ao carrinho
                </Button>
                <Button variant='solid' colorScheme='blue' mr="auto" onClick={comprarAgora}>
                  Comprar agora
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default ProductPage;
