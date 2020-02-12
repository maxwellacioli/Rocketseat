import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    /*
      Cria uma instação do servidor express
     */
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandle();
  }

  middlewares() {
    /*
      Configuração do sentry seguindo a documentação:
      -The request handler must be the first middleware on the app
     */
    this.server.use(Sentry.Handlers.requestHandler());

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

    /*
      Configuração do sentry seguindo a documentação:
      -The error handler must be before any other error middleware and after
      all control
     */
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandle() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

/*
  Exporta o servidor da aplicação definido no construtor da classe App
 */
export default new App().server;
