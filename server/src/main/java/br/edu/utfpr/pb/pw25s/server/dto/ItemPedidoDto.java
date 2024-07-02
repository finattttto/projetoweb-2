package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.model.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ItemPedidoDto {

    private int id;

    private BigDecimal preco;

    @NotNull
    private int quantidade;

    @NotNull
    private ProdutoDto produto;

}
