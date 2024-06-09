import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { Types } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { UsersService } from './users/users.service';
import { IUsersService } from './users/user.service.interface';
import { IUsersController } from './users/users.controller.interface';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(Types.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(Types.ExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(Types.UserController).to(UsersController);
	bind<IUsersService>(Types.UserService).to(UsersService);
	bind<PrismaService>(Types.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(Types.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(Types.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(Types.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
