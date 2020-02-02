import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', authMiddleware, UserController.show);
routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);
routes.post('/recipients', authMiddleware, RecipientController.store);

export default routes;
