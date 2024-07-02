import { IPedido, IProduct } from "@/commons/interfaces";
import { api } from "@/lib/axios";



const PEDIDOS_URL = "/pedidos";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PEDIDOS_URL}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findByUser = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PEDIDOS_URL}/get-by-user`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};


const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${PEDIDOS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const save = async (pedido: IPedido): Promise<any> => {
  let response;
  try {
    response = await api.post(`${PEDIDOS_URL}`, pedido);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PEDIDOS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const PedidoService = {
  findAll,
  remove,
  save,
  findById,
  findByUser
};

export default PedidoService;
