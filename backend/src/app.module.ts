import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [
		AuthorizationModule,
		ConfigModule.forRoot(),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: 'localhost',
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			models: [],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
