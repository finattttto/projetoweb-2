package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.PedidoRepository;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoServiceImpl extends CrudServiceImpl<Pedido, Long>
                                    implements IPedidoService {

    private final PedidoRepository pedidoRepository;

    @Autowired
    ProdutoServiceImpl produtoService;

    @Autowired
    ItemPedidoServiceImpl itemPedidoService;

    @Autowired
    AuthService authService;


    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    protected JpaRepository<Pedido, Long> getRepository() {
        return pedidoRepository;
    }

    @Override
    @Transactional
    public Pedido save(Pedido pedido) {

        // pegar o ID do cliente pelo TOKEN
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authService.loadUserByUsername(auth.getPrincipal().toString());
        pedido.setUsuario(user);

        // remove os itens do pedido que foram excluidos
        if (pedido.getId() != null && pedido.getId() != 0) {
            Pedido lastPedido = findOne(pedido.getId());
            if (lastPedido != null) {
                List<Long> idDetalhes = pedido.getItens().stream()
                        .map(ItemPedido::getId)
                        .collect(Collectors.toList());

                for (ItemPedido lastItem : lastPedido.getItens()) {
                    if (!idDetalhes.contains(lastItem.getId())) {
                        // se o id nao esta mais entre os que estao sendo salvos, é pq foi apagado
                        itemPedidoService.delete(lastItem.getId());
                    }
                }
            }
        }

        pedido.setTotalPedido(BigDecimal.valueOf(0));
        for (ItemPedido item : pedido.getItens()) {
            Produto prod = produtoService.findOne(item.getProduto().getId());
            item.setPreco(BigDecimal.valueOf(item.getQuantidade()).multiply(prod.getPreco()));
            item.setPedido(pedido);
            pedido.setTotalPedido(pedido.getTotalPedido().add(item.getPreco()));
        }
        return getRepository().save(pedido);
    }

    @Override
    public List<Pedido> findAllByUsuarioId(Long id) {
        return pedidoRepository.findAllByUsuarioId(id);
    }
}
