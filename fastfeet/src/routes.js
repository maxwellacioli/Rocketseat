import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);

// Checking authorized user
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.put('/users', UserController.update);

export default routes;
