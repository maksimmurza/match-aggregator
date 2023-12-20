import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { Request as Req, Response as Res } from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/greeting')
	getGreeting(): string {
		return 'Hi there!';
	}

	@UseGuards(AuthorizationGuard)
	@Get('/user-preferences')
	getUserPreferences(@Request() req: Req, @Response() res: Res) {
		this.appService.getUserPreferences(req, res);
	}
}
