import React from 'react';
import { 
  Card, CardBody, Heading, Stack, Text, Button, Image, 
  CardFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, 
  useDisclosure, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, 
  Flex, Box, HStack, Input, useNumberInput 
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import CarrinhoService from '@/services/CarrinhoService';
import { useNavigate } from 'react-router-dom';

const ProductCarrinhoCard: React.FC<any> = ({ carrinho, onEvent }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [value, setValue] = React.useState(carrinho.quantidade);

  const onClickRemover = async () => {
    await CarrinhoService.removerDoCarrinho(carrinho.produto.id);
    onEvent();
    onClose();
  }

  const onChangeQuantidade = async (newQuantity) => {
    setValue(newQuantity);
    await CarrinhoService.alterarQuantidade(carrinho.produto.id, newQuantity);
    onEvent();
  }

  const precoUnitario = carrinho.produto.preco;
  const precoTotal = (precoUnitario * value).toFixed(2);

  const {
    getInputProps, getIncrementButtonProps, getDecrementButtonProps
  } = useNumberInput({
    step: 1,
    defaultValue: carrinho.quantidade,
    min: 1,
    max: 50,
    precision: 0,
    onChange: (valueString, valueNumber) => onChangeQuantidade(valueNumber)
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <>
      <Card overflow='hidden' variant='outline' borderWidth='1px' borderRadius='lg' p={4} boxShadow='md'>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Image
            objectFit='cover'
            height="200px"
            src={carrinho.produto.imagem}
            alt={carrinho.produto.nome}
            borderRadius='md'
          />

          <Stack flex='1' spacing={4}>
            <CardBody p={4}>
              <Heading size='md'>{carrinho.produto.nome}</Heading>
              <Flex py='2' align='center'>
                <Text mr={4}>
                  Quantidade:
                </Text>
                <HStack maxW='150px'>
                  <Button {...dec}>-</Button>
                  <Input {...input} />
                  <Button {...inc}>+</Button>
                </HStack>
                <Box ml='auto' textAlign='right'>
                  <Text>Preço Unitário: R${precoUnitario.toFixed(2).replace('.', ',')}</Text>
                  <Text>Preço Total: R${precoTotal.replace('.', ',')}</Text>
                </Box>
              </Flex>
              <Flex justifyContent="flex-end">
                <Button mt={4} variant='solid' colorScheme='red' rightIcon={<CloseIcon />} onClick={onOpen}>
                  Remover
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Remover Produto
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Tem certeza que deseja remover esse produto do carrinho?
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button colorScheme='red' onClick={onClickRemover} ml={3}>
                          Remover
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Flex>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default ProductCarrinhoCard;
