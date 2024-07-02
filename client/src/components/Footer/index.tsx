import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">WebBooks</h5>

            <p>
            Bem-vindo à WebBooks, sua loja de livros online! Oferecemos uma vasta seleção de títulos de todos os gêneros, desde clássicos até os lançamentos mais recentes. Navegue, descubra novos autores e aproveite nossas promoções exclusivas. Compre online e receba no conforto da sua casa. WebBooks – Sua próxima leitura está aqui.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Redes Sociais</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">Facebook.com/WebBooks</a>
              </li>
              <li>
                <a href="#!" className="text-dark">X.com/WebBooks</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Instagram.com/WebBooks</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Entre em contato</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">Parcerias</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Trabalhe Conosco!</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Deixe sua avaliação</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()}
        <a className="text-dark" href="https://www.WebBooks.com/"> WebBooks.com</a>
      </div>
    </footer>
  );
};

export default Footer;
