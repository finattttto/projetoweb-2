package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoriaDto;
import br.edu.utfpr.pb.pw25s.server.dto.PedidoDto;
import br.edu.utfpr.pb.pw25s.server.model.Categoria;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICategoriaService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IPedidoService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pedidos")
public class PedidoController extends CrudController<Pedido, PedidoDto, Long>{

    private final IPedidoService service;
    private final ModelMapper modelMapper;

    @Autowired
    AuthService authService;

    public PedidoController(IPedidoService service, ModelMapper modelMapper) {
        super(Pedido.class, PedidoDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Pedido, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("get-by-user")
    public ResponseEntity<List<Pedido>> findByUser() {
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authService.loadUserByUsername(auth.getPrincipal().toString());
        return ResponseEntity.ok(service.findAllByUsuarioId(user.getId()));
    }

}
