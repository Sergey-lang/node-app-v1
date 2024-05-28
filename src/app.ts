import express, { Express } from 'express';
import { Server } from 'http'
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { Types } from './types';
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(Types.ILogger) private logger: ILogger,
        @inject(Types.UserController) private userController: UsersController,
        @inject(Types.ExceptionFilter) private exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router); // connect to all users (middleware)
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Start server at ${this.port}`);
    }
}