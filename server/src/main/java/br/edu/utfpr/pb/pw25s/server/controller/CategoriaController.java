package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoriaDto;
import br.edu.utfpr.pb.pw25s.server.model.Categoria;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICategoriaService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categorias")
public class CategoriaController extends CrudController<Categoria, CategoriaDto, Long>{

    private final ICategoriaService service;
    private final ModelMapper modelMapper;

    public CategoriaController(ICategoriaService service, ModelMapper modelMapper) {
        super(Categoria.class, CategoriaDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Categoria, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}
