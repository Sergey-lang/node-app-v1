import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http.error.class';
import { inject, injectable } from 'inversify';
import { Types } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './user.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(Types.ILogger) private loggerService: ILogger,
		@inject(Types.UserService) private userService: IUsersService,
	) {
		super(loggerService); // call to get all parent features
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Test Error', 'login'));
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User already exist'));
		}
		this.ok(res, { email: result.email });
	}
}
