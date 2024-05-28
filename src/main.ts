import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { Types } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(Types.ILogger).to(LoggerService);
	bind<IExceptionFilter>(Types.ExceptionFilter).to(ExceptionFilter);
	bind<UsersController>(Types.UserController).to(UsersController);
	bind<App>(Types.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(Types.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
