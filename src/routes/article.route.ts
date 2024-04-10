import { Router } from 'express';
import * as controller from '../controllers/article.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
import multer, { Multer } from 'multer';
import path from 'path';
export const article = Router();
// Cấu hình Multer
const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload: Multer = multer({ storage });



// const userMiddleware = new UserMiddleware();
article.post('/create', upload.fields([
    { name: 'wordFiles', maxCount: 5 },
    { name: 'imageFiles', maxCount: 5 },
]), controller.create);
article.get('/get-by-id/:id', controller.findOne);
article.get('/get-all', controller.findAll);
article.delete('/delete/:id', controller.remove);
article.put('/edit/:id', controller.update);
