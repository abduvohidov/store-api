import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { UserController } from './modules/users/controllers/users.controller';
import { IMongoService } from './database';
import { UsersRepository } from './modules/users/repositories/users.repository';
import { CategoriesController } from './modules/categories/controllers/categories.controller';
import { CategoryRepository } from './modules/categories/repositories/categories.reposotiries';
import { ProductController } from './modules/products/controllers/product.controller';
import { ProductRepository } from './modules/products/repositories/product.repositories';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number | string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.MongoService) private mongoService: IMongoService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
		@inject(TYPES.CategoryController) private categoryController: CategoriesController,
		@inject(TYPES.CategoriesRepository) private categoriesRepository: CategoryRepository,
		@inject(TYPES.ProductController) private productController: ProductController,
		@inject(TYPES.ProductRepository) private productRepository: ProductRepository,
	) {
		this.app = express();
		this.port = this.configService.get('PORT') || 9000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/categories', this.categoryController.router);
		this.app.use('/products', this.productController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
