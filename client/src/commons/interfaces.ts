export interface IUserSigup {
  displayName: string;
  username: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface ICategory {
  id?: number;
  nome: string;
}

export interface IProduct {
  id?: number;
  nome?: string;
  preco?: number;
  descricao?: string;
  categoria?: ICategory;
  imagem?: string;
}

export interface IItemPedido {
  produto: IProduct;
  quantidade: number;
}

export interface IPedido {
  id?: number;
  data: Date;
  descricao: string;
  itens: IItemPedido[];
  totalPedido?: number;
}

export class Carrinho {
  produto: IProduct;
  quantidade: number;
}
