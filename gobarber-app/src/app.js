import express from 'express';
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
