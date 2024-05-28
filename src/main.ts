import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { Types } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';


// const logger = new LoggerService();
// const app = new App(
//     logger,
//     new UsersController(logger),
//     new ExceptionFilter(logger),
// )
const appContainer = new Container();
appContainer.bind<ILogger>(Types.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(Types.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UsersController>(Types.UserController).to(UsersController);
appContainer.bind<App>(Types.Application).to(App);

const app = appContainer.get<App>(Types.Application);
app.init()

export { app, appContainer };
