import bcrypt from 'bcrypt';
import { Article } from '../models/article.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { article } from '../routes/article.route';
import multer, { Multer } from 'multer';
import path from 'path';
// model article : files: {
//     type: [String],
//     required: true,
// },
// images: {
//     type: [String],
//     required: true,
// },
// entry_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// student_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// faculty_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// term_condition: {
//     type: Boolean,
//     required: true,
// }
//wirte crud for article


export const create = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const article = new Article(req.body);
        const newArticle = await Article.create(article);
        const { wordFiles, imageFiles } = req.files as { [key: string]: Express.Multer.File[] };

        // Lưu tên file Word vào MongoDB
        const wordFileModels = await Promise.all(wordFiles?.map(async (file) => {
          const fileModel = new Article({
            fileName: file.filename,
            fileType: 'word',
          });
          return await fileModel.save();
        }) || []);
    
        // Lưu tên file ảnh vào MongoDB
        const imageFileModels = await Promise.all(imageFiles?.map(async (file) => {
          const fileModel = new Article({
            fileName: file.filename,
            fileType: 'image',
          });
          return await fileModel.save();
        }) || []);
        return res.status(201).json({
            error: false, message: 'Article created successfully', data: newArticle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }


};

export const findAll = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find();
        return res.status(200).json({
            error: false, message: 'All articles', data: articles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article found', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};


export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const article = await Article.findByIdAndUpdate
            (id, body, { new: true });
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article updated', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article deleted', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}