package br.edu.utfpr.pb.pw25s.server.service.interfaces;

import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.Produto;

import java.util.List;

public interface IProdutoService extends ICrudService <Produto, Long>{

    List<Produto> findAllByCategoriaId(Long id);

}
