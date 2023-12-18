import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getUserPreferences(): string {
		return 'protected string';
	}
}
