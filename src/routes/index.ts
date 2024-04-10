import { Router, Request, Response } from 'express';
import { user } from './user.route';
import { article } from './article.route';
import { faculty } from './faculty.route';
import { schoolYear } from './school-year.route';
import { entries } from './entries.route';
import { comment } from './comment.route';
// import { UserMiddleware } from '../middlewares';

const routes = Router();
// const userMiddleware = new UserMiddleware();

// Home route
routes.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API project!');
});

// API routes
routes.use('/api/user', user);
routes.use('/api/article', article);
routes.use('/api/faculty', faculty);
routes.use('/api/school-year', schoolYear);
routes.use('/api/entries', entries);
routes.use('/api/comment', comment);


// With Middleware
// routes.use('/api/user', userMiddleware.validateToken, userMiddleware.hasAnyRole(['user', 'admin']), user);

export default routes;
