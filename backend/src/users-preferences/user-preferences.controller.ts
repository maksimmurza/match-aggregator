import { Controller, Get, Put, Request, Response, UseGuards } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { Request as Req, Response as Res } from 'express';

@UseGuards(AuthorizationGuard)
@Controller('/user-preferences')
export class UserPreferencesController {
	constructor(private readonly userPreferencesService: UserPreferencesService) {}

	@Get()
	getUserPreferences(@Request() req: Req & { userId: string }, @Response() res: Res) {
		this.userPreferencesService.getUserPreferences(req.userId).then((userPreferences) => {
			res.json(userPreferences);
		});
	}

	@Put()
	putUserSelectedTeams(@Request() req: Req & { userId: string }, @Response() res: Res) {
		this.userPreferencesService.putSelectedTeams(req.userId, req.body).then((resp) => {
			res.json(resp);
		});
	}
}
