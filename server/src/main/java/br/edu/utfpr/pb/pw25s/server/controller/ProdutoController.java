package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.ProdutoDto;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IProdutoService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
    @RequestMapping("produtos")
public class ProdutoController extends CrudController<Produto, ProdutoDto, Long>{

    private final IProdutoService service;
    private final ModelMapper modelMapper;

    public ProdutoController(IProdutoService service, ModelMapper modelMapper) {
        super(Produto.class, ProdutoDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Produto, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("get-by-categoria/{id}")
    public ResponseEntity<List<Produto>> findAllByCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(service.findAllByCategoriaId(id));
    }

}
