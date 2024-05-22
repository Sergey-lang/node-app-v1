import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
    path: string; // api call url
    func: (req: Request, res: Response, next: NextFunction) => void; // default express callback
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>; // what to do if url call
}