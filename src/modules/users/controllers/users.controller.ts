import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../common/base.controller';
import { HTTPError } from '../../../errors/http-error.class';
import { ILogger } from '../../../logger/logger.interface';
import { TYPES } from '../../../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/users.service';
import { ValidateMiddleware } from '../../../common/validate.middleware';
import { IUserModel } from '../models/user.model.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/all',
				method: 'get',
				func: this.getUsers,
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно вошли в систему',
		});
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно прошли регистрацию',
			data: {
				id: result._id,
				email: result.email,
			},
		});
	}

	async getUsers(req: Request, res: Response, next: NextFunction): Promise<IUserModel[] | void> {
		const data = await this.userService.getUsers();
		if (!data) {
			return next(new HTTPError(422, 'Нет пользователей'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставленные пользователи',
			data,
		});
	}
}
