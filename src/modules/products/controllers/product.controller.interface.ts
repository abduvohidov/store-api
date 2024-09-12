import { NextFunction, Request, Response } from 'express';
import { IProductModel } from '../models/product.model.interface';

export interface IProductController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	findAll: (req: Request, res: Response, next: NextFunction) => Promise<IProductModel[] | void>;
	findByName: (req: Request, res: Response, next: NextFunction) => Promise<IProductModel | void>;
	findById: (req: Request, res: Response, next: NextFunction) => Promise<IProductModel | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	remove: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
