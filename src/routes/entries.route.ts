import { Router } from 'express';
import * as controller from '../controllers/entries.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
export const entries = Router();
// const userMiddleware = new UserMiddleware();
entries.post('/create', controller.createEntry);
entries.get('/get-by-id/:id', controller.getById);
entries.get('/get-all', controller.getAll);
entries.delete('/delete/:id', controller.deleteEntry);
entries.put('/edit/:id', controller.editEntry);

