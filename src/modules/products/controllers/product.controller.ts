import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { ILogger } from '../../../logger/logger.interface';
import { BaseController } from '../../../common/base.controller';
import { HTTPError } from '../../../errors/http-error.class';
import { IProductController } from './product.controller.interface';
import { ProductService } from '../services/product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { IProductModel } from '../models/product.model.interface';
import { ProductUpdateDto } from '../dto/product-update.dto';

@injectable()
export class ProductController extends BaseController implements IProductController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ProductService) private productService: ProductService,
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
		{ body }: Request<{}, {}, ProductCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productService.createProduct(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой продукт уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно создано продукт',
			data: {
				_id: result.id,
				name: result.name,
			},
		});
	}

	async findAll(
		{ body }: Request<{}, {}, ProductCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<IProductModel[] | void> {
		const data = await this.productService.getProducts();
		if (!data) {
			return next(new HTTPError(422, 'Нет продукты'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставленные продукты',
			data,
		});
	}

	async findByName(req: Request, res: Response, next: NextFunction): Promise<IProductModel | void> {
		const { name } = req.params;

		if (!name || typeof name !== 'string') {
			return next(new HTTPError(400, 'Имя продукта не указано или указано неверно'));
		}

		const data = await this.productService.getProductByName(name);
		if (!data) {
			return next(new HTTPError(422, 'Нет такой продукт'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставлена продукт',
			data,
		});
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<IProductModel | void> {
		const { id } = req.params;

		if (!id || typeof id !== 'string') {
			return next(new HTTPError(400, 'ID продукта не указано или указано неверно'));
		}

		const data = await this.productService.getProductById(id);
		if (!data) {
			return next(new HTTPError(422, 'Нет такого продукта'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно предоставлена продукт',
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const dto: ProductUpdateDto = req.body;

		const updatedProduct = await this.productService.updateProduct(id, dto);
		if (!updatedProduct) {
			this.ok(res, 'Продукт не найдена или не обновлена');
			return;
		}
		this.ok(res, {
			status: true,
			message: 'Продукт успешно обновлена',
			data: updatedProduct,
		});
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const result = await this.productService.removeProduct(id);
		if (!result) {
			return next(new HTTPError(422, 'Нет такого продукта'));
		}
		this.ok(res, {
			status: true,
			message: 'Продукт успешно удалено',
		});
	}
}
