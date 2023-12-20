import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AppService {
	getUserPreferences(req: Request, res: Response) {
		res.json({ message: 'protected user message' });
	}
}
