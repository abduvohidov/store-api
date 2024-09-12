import { NextFunction, Request, Response } from 'express';
import { ICategoryModel } from '../models/category.model.interface';

export interface ICategoryController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	findAll: (req: Request, res: Response, next: NextFunction) => Promise<ICategoryModel[] | void>;
	findByName: (req: Request, res: Response, next: NextFunction) => Promise<ICategoryModel | void>;
	findById: (req: Request, res: Response, next: NextFunction) => Promise<ICategoryModel | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	remove: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
