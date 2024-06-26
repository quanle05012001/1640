import { Router } from 'express';
import * as controller from '../controllers/faculty.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
export const faculty = Router();
// const userMiddleware = new UserMiddleware();
faculty.post('/create', controller.createFaculty);
faculty.get('/get-by-id/:id', controller.getFacultyById);
faculty.get('/get-all', controller.getAllFaculty);
faculty.delete('/delete/:id', controller.deleteFaculty);
faculty.put('/edit/:id', controller.editFaculty);
