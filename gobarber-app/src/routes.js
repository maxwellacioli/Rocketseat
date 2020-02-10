import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

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

/*
  Apesar de um provider ser um usuário, é necessário separar a lógica para
  outro controller, pois a proposta não é listar todos os usuários e sim apenas
  os providers.
 */
routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

/*
  Listagem dos agendamentos de um usuário comum
 */
routes.get('/appointments', AppointmentController.index);

/*
  Listagem dos agendamentos de um provider
 */
routes.get('/schedule', ScheduleController.index);

/*
  Listagem de notificações de usuários
 */
routes.get('/notifications', NotificationController.index);

/*
  Marcar uma notificação como lida
*/
routes.put('/notifications/:id', NotificationController.update);

export default routes;
