import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import providerMiddleware from './app/middlewares/provider';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);

// Checking authorized user
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

// Checking provider user
routes.use(providerMiddleware);

routes.post('/couriers', CourierController.store);
routes.get('/couriers', CourierController.index);
routes.delete('/couriers/:id', CourierController.delete);
routes.put('/couriers/:id', CourierController.update);

routes.post('/files/:courierId', upload.single('file'), FileController.store);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);

routes.put('/couriers/:courierId/orders/:orderId', (req, res) => {
  return res.send();
});

export default routes;
