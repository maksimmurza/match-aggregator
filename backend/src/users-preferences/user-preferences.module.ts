import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPreferences } from './user-preferences.model';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [SequelizeModule.forFeature([UserPreferences]), ConfigModule.forRoot()],
	providers: [UserPreferencesService],
	controllers: [UserPreferencesController],
	exports: [SequelizeModule],
})
export class UserPreferencesModule {
	constructor(private configService: ConfigService) {}
}
