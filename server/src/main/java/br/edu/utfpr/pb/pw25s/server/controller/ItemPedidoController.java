package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.ItemPedidoDto;
import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IItemPedidoService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("item-pedido")
public class ItemPedidoController extends CrudController<ItemPedido, ItemPedidoDto, Long>{

    private final IItemPedidoService service;
    private final ModelMapper modelMapper;

    public ItemPedidoController(IItemPedidoService service, ModelMapper modelMapper) {
        super(ItemPedido.class, ItemPedidoDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<ItemPedido, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}
