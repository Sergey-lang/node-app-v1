import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string; // api call url
	func: (req: Request, res: Response, next: NextFunction) => void; // default express callback
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>; // what to do if url call
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
