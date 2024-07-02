import { IProduct } from "@/commons/interfaces";
import { useToast } from "@chakra-ui/react";

interface IProdutoCarrinho {
  produto: IProduct;
  quantidade: number;
}

const addToCarrinho = async (produto: IProduct, qtde: number = 1, toast?: any) => {

  let carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );

  let encontrado = false;
  carrinho = carrinho.map((item) => {
    if (item.produto.id === produto.id) {
      item.quantidade += qtde;
      encontrado = true;
    }
    return item;
  });

  if (!encontrado) {
    carrinho.push({ produto, quantidade: qtde });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if(toast){
    toast({
      title: 'Sucesso.',
      description: "Produto adicionado ao carrinho!",
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top-right',
    });
  }
};

const removerDoCarrinho = async (produtoId: number) => {
  let carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );
  carrinho = carrinho.filter((item) => item.produto.id !== produtoId);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const getCarrinho = async (): Promise<IProdutoCarrinho[]> => {
  const carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );
  return carrinho;
};

const limparCarrinho = async (): Promise<void> => {
  return localStorage.removeItem("carrinho");
};

const alterarQuantidade = async (produtoId: number, novaQuantidade: number) => {
  let carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );

  let produtoEncontrado = false;
  carrinho = carrinho.map((item) => {
    if (item.produto.id == produtoId) {
      produtoEncontrado = true;
      if (novaQuantidade > 0) {
        item.quantidade = novaQuantidade;
      } else {
        return null;
      }
    }
    return item;
  }).filter(Boolean) as IProdutoCarrinho[];

  if (produtoEncontrado) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
};

const CarrinhoService = {
  addToCarrinho,
  removerDoCarrinho,
  getCarrinho,
  alterarQuantidade,
  limparCarrinho
};

export default CarrinhoService;
