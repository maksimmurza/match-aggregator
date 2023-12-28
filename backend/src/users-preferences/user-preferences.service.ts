import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserPreferences } from './user-preferences.model';

@Injectable()
export class UserPreferencesService {
	constructor(
		@InjectModel(UserPreferences)
		private userPreferencesModel: typeof UserPreferences,
	) {
		userPreferencesModel.sync();
	}

	async getUserPreferences(userId: string): Promise<UserPreferences> {
		const [userPreferences] = await this.userPreferencesModel.findOrCreate({
			where: {
				userId,
			},
			defaults: {
				userId,
				selectedTeams: null,
			},
		});

		return userPreferences;
	}

	async putSelectedTeams(userId: string, payload: any) {
		const result = await this.userPreferencesModel.update(
			{ selectedTeams: payload },
			{
				where: {
					userId,
				},
			},
		);

		return result;
	}
}
