package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.*;
import br.edu.utfpr.pb.pw25s.server.repository.CategoriaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.PedidoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProdutoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class PedidoControllerTests {

    private final String API_PEDIDOS = "/pedidos";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @BeforeEach
    public void limparBaseDeDados() {
        pedidoRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void buscarTodosPedidos_deveRetornarListaDePedidos() {

        Categoria categoriaInserida = categoriaRepository.save(Categoria.builder().nome("CategoriaTeste").build());
        Produto produto = produtoRepository.save(Produto.builder().nome("Produto 1").descricao("Produto Teste 1").preco(BigDecimal.valueOf(100)).categoria(categoriaInserida).build());
        User usuario = userRepository.save(User.builder().username("luan").displayName("Luan Finatto").password("Luan123").build());

        pedidoRepository.save(
                Pedido.builder()
                        .usuario(usuario)
                        .itens(Collections.singletonList(ItemPedido
                                .builder()
                                .produto(produto)
                                .quantidade(2)
                                .preco(BigDecimal.valueOf(200))
                                .build()))
                        .descricao("Pedido 1")
                        .build());

        ResponseEntity<Pedido[]> response =
                testRestTemplate.getForEntity(
                        API_PEDIDOS,
                        Pedido[].class);


        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }


}
