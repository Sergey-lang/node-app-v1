import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Not valid email' })
	email: string;
	@IsString({ message: 'Not set password' })
	password: string;
	@IsString({ message: 'Not set name' })
	name: string;
}