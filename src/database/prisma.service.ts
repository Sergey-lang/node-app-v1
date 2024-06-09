import { inject, injectable } from 'inversify';
import { PrismaClient, UserModel } from '@prisma/client';
import { Types } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(Types.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Successfully connected to db');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Connection error:' + e.message);
			}
		}

	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}