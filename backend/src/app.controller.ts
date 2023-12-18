import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/greeting')
	getGreeting(): string {
		return 'Hi there!';
	}

	@UseGuards(AuthorizationGuard)
	@Get('/user-preferences')
	getUserPreferences(): string {
		return this.appService.getUserPreferences();
	}
}
