import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
	constructor(private sequelize: Sequelize) {}

	async getUserPreferences(req: Request, res: Response) {
		await this.sequelize.authenticate();
		res.json({ message: 'protected user message' });
	}
}
