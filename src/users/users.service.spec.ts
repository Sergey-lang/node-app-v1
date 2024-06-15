import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './user.service.interface';
import { Types } from '../types';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(Types.UserService).to(UsersService);
	container.bind<IConfigService>(Types.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(Types.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(Types.ConfigService);
	usersRepository = container.get<IUsersRepository>(Types.UsersRepository);
	usersService = container.get<IUsersService>(Types.UserService);
});

let createdUser: UserModel | null;

describe('User service', () => {
	it('create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => {
			return { name: user.name, email: user.email, password: user.password, id: 1 };
		});
		createdUser = await usersService.createUser({
			email: 'a@mail.ru',
			name: 'David',
			password: '1',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validate user user success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@mail.ru',
			password: '1',
		});

		expect(result).toBeTruthy();
	});

	it('wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@mail.ru',
			password: 'w',
		});

		expect(result).toBeFalsy();
	});

	it('wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({
			email: 'a3@mail.ru',
			password: 'w',
		});

		expect(result).toBeFalsy();
	});
});