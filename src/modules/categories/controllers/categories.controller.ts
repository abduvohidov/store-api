import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ICategoryController } from './categories.controller.interface';
import { TYPES } from '../../../types';
import { ILogger } from '../../../logger/logger.interface';
import { BaseController } from '../../../common/base.controller';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryService } from '../services/categories.service';
import { HTTPError } from '../../../errors/http-error.class';
import { ICategoryModel } from '../models/category.model.interface';
import { CategoryUpdateDto } from '../dto/category-update.dto';

@injectable()
export class CategoriesController extends BaseController implements ICategoryController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CategoryService) private categoryService: CategoryService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create.bind(this),
			},
			{
				path: '/all',
				method: 'get',
				func: this.findAll.bind(this),
			},
			{
				path: '/update/:id',
				method: 'patch',
				func: this.update.bind(this),
			},
			{
				path: '/name/:name',
				method: 'get',
				func: this.findByName.bind(this),
			},
			{
				path: '/id/:id',
				method: 'get',
				func: this.findById.bind(this),
			},
		]);
	}

	async create(
		{ body }: Request<{}, {}, CategoryCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.categoryService.createCategory(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой категория уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно создано категория',
			data: {
				name: result.name,
				productsId: result.productsId,
			},
		});
	}

	async findAll(
		{ body }: Request<{}, {}, CategoryCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<ICategoryModel[] | void> {
		const data = await this.categoryService.getCategories();
		if (!data) {
			return next(new HTTPError(422, 'Нет категории'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставленные категории',
			data,
		});
	}

	async findByName(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<ICategoryModel | void> {
		const { name } = req.params;

		if (!name || typeof name !== 'string') {
			return next(new HTTPError(400, 'Имя категории не указано или указано неверно'));
		}

		const data = await this.categoryService.getCategoryByName(name);
		if (!data) {
			return next(new HTTPError(422, 'Нет такой категории'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставлена категория',
			data,
		});
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<ICategoryModel | void> {
		const { id } = req.params;

		if (!id || typeof id !== 'string') {
			return next(new HTTPError(400, 'ID категории не указано или указано неверно'));
		}

		const data = await this.categoryService.getCategoryById(id);
		if (!data) {
			return next(new HTTPError(422, 'Нет такой категории'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставлена категория',
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const dto: CategoryUpdateDto = req.body;

		try {
			const updatedCategory = await this.categoryService.updateCategory(id, dto);
			if (!updatedCategory) {
				this.ok(res, 'Категория не найдена или не обновлена');
				return;
			}
			this.ok(res, {
				status: true,
				message: 'Категория успешно обновлена',
				data: updatedCategory,
			});
		} catch (error) {
			next(error);
		}
	}
}
