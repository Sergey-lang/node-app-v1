import { LoggerService } from '../logger/logger.service';
import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public created<T>(res: Response, message: T) {
        return res.sendStatus(201);
    }

    public ok<T>(res: Response, message: T) {
        this.send<T>(res, 200, message)
    }

    protected bindRoutes(router: IControllerRoute[]) {
        for (const route of router) {
            this.logger.log(`[${route.method} ${route.path}]`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}