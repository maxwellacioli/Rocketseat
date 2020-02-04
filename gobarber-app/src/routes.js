import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

/*
  Cria uma instância de Router presente em express
 */
const routes = new Router();
/*
  Cria uma instância de multer com todas as configurações definidas
  no arquivo multer.js
 */
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/*
  Adiciona o authMiddleware em todas as rotas que são definidas a partir
  deste ponto.
 */
routes.use(authMiddleware);

routes.put('/users', UserController.update);

/*
  O middle upload irá transmitir apenas um arquivo por vez, neste caso,
  o objeto req, tem um atributo chamado 'file', onde este contém todas as
  informações do arquivo feito upload
 */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
