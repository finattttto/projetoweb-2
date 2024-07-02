package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PedidoDto {

    private int id;

    @NotNull
    private Date data;

    @NotNull
    @Size(min = 2, max = 50)
    private String descricao;

    private BigDecimal totalPedido;

    private UsuarioDto usuario;

    @NotNull
    private List<ItemPedidoDto> itens = new ArrayList<>();

}
