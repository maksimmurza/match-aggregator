import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPreferencesModule } from './users-preferences/user-preferences.module';
import { UserPreferences } from './users-preferences/user-preferences.model';
import { getDatabaseConfig } from './databaseConfig';

@Module({
	imports: [
		AuthorizationModule,
		UserPreferencesModule,
		ConfigModule.forRoot(),
		SequelizeModule.forRoot({
			...getDatabaseConfig(),
			models: [UserPreferences],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
