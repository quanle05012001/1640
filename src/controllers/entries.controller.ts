import bcrypt from 'bcrypt';
import { Entries } from '../models/entries.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { entries } from '../routes/entries.route';
//crud for entries
export const createEntry = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const entry = new Entries(req.body);
        const newEntry = await Entries.create(entry);
        return res.status(201).json({
            error: false, message: 'Entries created successfully', data: newEntry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    
    
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const entries = await Entries.find();
        return res.status(200).json({
            error: false, message: 'All entries', data: entries
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entry = await Entries.findById(id);
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entries not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entries found', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

export const editEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const entry = await Entries.findByIdAndUpdate
        (id , body, { new: true }); 
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entries not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entries updated', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

export const deleteEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entry = await Entries.findByIdAndDelete(id);
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entries not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entries deleted', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};