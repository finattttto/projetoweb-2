package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoDto {

    private int id;

    @NotNull
    @Size(min = 2, max = 50)
    private String nome;

    private String descricao;

    private BigDecimal preco;

    private CategoriaDto categoria;

    private String imagem;

}
