import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPreferencesModule } from './users-preferences/user-preferences.module';
import { UserPreferences } from './users-preferences/user-preferences.model';

@Module({
	imports: [
		AuthorizationModule,
		UserPreferencesModule,
		ConfigModule.forRoot(),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.MYSQL_HOST,
			port: 3306,
			username: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			models: [UserPreferences],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
