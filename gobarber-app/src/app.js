import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    /*
      Cria uma instação do servidor express
     */
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    /*
      Define que as informações repassadas pelas requisições e respostas
      seguem o formato json
     */
    this.server.use(express.json());
    this.server.use(
      '/files',
      /*
        o método static retorna algum arquivo presente no servidor
       */
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    /*
      Adiciona todas as rotas que o servidor comporta
     */
    this.server.use(routes);
  }
}

/*
  Exporta o servidor da aplicação definido no construtor da classe App
 */
export default new App().server;
