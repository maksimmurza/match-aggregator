import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserPreferences } from './user-preferences.model';

@Injectable()
export class UserPreferencesService {
	constructor(
		@InjectModel(UserPreferences)
		private userPreferencesModel: typeof UserPreferences,
	) {}

	async getUserPreferences(userId: string): Promise<UserPreferences> {
		const [userPreference] = await this.userPreferencesModel.findOrCreate({
			where: {
				userId,
			},
			defaults: {
				userId,
				unselectedTeams: [],
			},
		});

		return userPreference;
	}
}
