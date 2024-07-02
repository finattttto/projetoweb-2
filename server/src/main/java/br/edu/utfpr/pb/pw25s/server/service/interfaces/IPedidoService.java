package br.edu.utfpr.pb.pw25s.server.service.interfaces;

import br.edu.utfpr.pb.pw25s.server.model.Pedido;

import java.util.List;

public interface IPedidoService extends ICrudService<Pedido, Long> {

    List<Pedido> findAllByUsuarioId(Long id);
}
