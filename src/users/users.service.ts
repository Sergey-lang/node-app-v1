import { IUsersService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { Types } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(Types.ConfigService) private configService: IConfigService,
		@inject(Types.UsersRepository) private usersRepository: IUsersRepository,
	) {
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		const isExistedUser = await this.usersRepository.find(newUser.email);
		if (isExistedUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}

	async validateUser({}: UserLoginDto): Promise<boolean> {
		return true;
	}
}