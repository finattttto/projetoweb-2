package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.Categoria;
import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.CategoriaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProdutoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProdutoControllerTests {

    private final String API_PRODUTOS = "/produtos";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @BeforeEach
    public void limparBaseDeDados() {
        produtoRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    @DisplayName("Espera retorno de produtos inseridos para teste usando findAll")
    public void buscarTodosProdutos_deveRetornarListaDeProdutos() {

        Categoria categoriaInserida = categoriaRepository.save(Categoria.builder().nome("CategoriaTeste").build());

        Produto produto1 = criarProduto("Produto 1", "Descricaoo do Produto 1", BigDecimal.valueOf(100), categoriaInserida);
        Produto produto2 = criarProduto("Produto 2", "Descricaoo do Produto 2", BigDecimal.valueOf(200), categoriaInserida);
        produtoRepository.saveAll(List.of(produto1, produto2));

        ResponseEntity<Produto[]> response =
                testRestTemplate.getForEntity(
                        API_PRODUTOS,
                        Produto[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(2);
    }

    @Test
    @DisplayName("Espera retorno de produtos inseridos para teste usando findByCategoria, pesquisando pela categoria inserida")
    public void buscarProdutosPorCategoria_deveRetornarListaDeProdutos() {

        Categoria categoriaInserida = categoriaRepository.save(Categoria.builder().nome("CategoriaTeste").build());

        Produto produto1 = criarProduto("Produto 1", "Descricaoo do Produto 1", BigDecimal.valueOf(100), categoriaInserida);
        Produto produto2 = criarProduto("Produto 2", "Descricaoo do Produto 2", BigDecimal.valueOf(200), categoriaInserida);
        produtoRepository.saveAll(List.of(produto1, produto2));

        ResponseEntity<Produto[]> response =
                testRestTemplate.getForEntity(
                        API_PRODUTOS + "/get-by-categoria/" + categoriaInserida.getId(),
                        Produto[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(2);
    }

    @Test
    @DisplayName("Espera retorno de produto único inserido, usando findOne")
    public void buscarProdutosPorId_deveRetornarProduto() {

        Categoria categoriaInserida = categoriaRepository.save(Categoria.builder().nome("CategoriaTeste").build());

        Produto produto = criarProduto("Produto", "Descricao do Produto", BigDecimal.valueOf(100), categoriaInserida);
        Produto produtoInserido = produtoRepository.save(produto);

        System.out.println("aaa: " + API_PRODUTOS   + "/"+  produtoInserido.getId());
        ResponseEntity<Produto> response =
                testRestTemplate.getForEntity(
                        API_PRODUTOS   + "/"+ produtoInserido.getId(),
                        Produto.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    private Produto criarProduto(String nome, String descricao, BigDecimal preco, Categoria categoria) {
        return Produto.builder()
                .nome(nome)
                .descricao(descricao)
                .preco(preco)
                .categoria(categoria)
                .build();
    }
}
