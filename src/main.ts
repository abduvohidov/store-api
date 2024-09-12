import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './modules/users/controllers/users.controller';
import { IUserController } from './modules/users/controllers/users.controller.interface';
import { UserService } from './modules/users/services/users.service';
import { IUserService } from './modules/users/services/users.service.interface';
import { IMongoService, MongoService } from './database';
import { UsersRepository } from './modules/users/repositories/users.repository';
import { IUserRepository } from './modules/users/repositories/users.repository.interface';
import { ICategoryController } from './modules/categories/controllers/categories.controller.interface';
import { ICategoryService } from './modules/categories/services/categories.service.interface';
import { ICategoryRepository } from './modules/categories/repositories/categories.reposotiries.interface';
import { CategoriesController } from './modules/categories/controllers/categories.controller';
import { CategoryService } from './modules/categories/services/categories.service';
import { CategoryRepository } from './modules/categories/repositories/categories.reposotiries';
import { IProductController } from './modules/products/controllers/product.controller.interface';
import { IProductService } from './modules/products/services/product.service.interface';
import { IProductRepository } from './modules/products/repositories/product.repositories.interface';
import { ProductController } from './modules/products/controllers/product.controller';
import { ProductService } from './modules/products/services/product.service';
import { ProductRepository } from './modules/products/repositories/product.repositories';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IMongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository);
	bind<ICategoryController>(TYPES.CategoryController).to(CategoriesController);
	bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
	bind<ICategoryRepository>(TYPES.CategoriesRepository).to(CategoryRepository);
	bind<IProductController>(TYPES.ProductController).to(ProductController);
	bind<IProductService>(TYPES.ProductService).to(ProductService);
	bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
