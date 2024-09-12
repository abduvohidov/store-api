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

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IMongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
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
