import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', authMiddleware, UserController.show);
routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);

export default routes;
