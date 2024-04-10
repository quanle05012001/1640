import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
export const user = Router();
const userMiddleware = new UserMiddleware();
user.post('/signup', controller.signup);
user.post('/login', controller.login);
user.post('/logout', userMiddleware.validateToken, controller.logout);
user.post('/refresh', controller.refresh);
user.post('/validate', controller.validate);
user.get('/get-by-id/:id', userMiddleware.validateToken, controller.getById);
user.get('/get-all', userMiddleware.validateToken, userMiddleware.hasAnyRole([roles.admin, roles.marketingManager]), controller.getAll);
user.delete('/delete/:id', userMiddleware.validateToken, userMiddleware.hasAnyRole([roles.admin, roles.marketingManager]), controller.deleteUser);
user.put('/edit/:id', userMiddleware.validateToken, userMiddleware.hasAnyRole([roles.admin, roles.marketingManager]), controller.editUser);
user.put('/change-password/:id', userMiddleware.validateToken, controller.changePassword);