package br.edu.utfpr.pb.pw25s.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_itemPedido")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal preco;

    private int quantidade;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "pedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "produto")
    private Produto produto;
}



