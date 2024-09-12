import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../models/user.model.interface';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	getUsers: (req: Request, res: Response, next: NextFunction) => Promise<IUserModel[] | void>;
}
