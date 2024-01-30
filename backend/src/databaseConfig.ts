import { SequelizeModuleOptions } from '@nestjs/sequelize';

const NODE_ENV_PRODUCTION = 'production';
const NODE_ENV_DEVELOPMENT = 'development';

type ConfigType = typeof NODE_ENV_PRODUCTION | typeof NODE_ENV_DEVELOPMENT;
type DatabaseConfig = Pick<
	SequelizeModuleOptions,
	'dialect' | 'host' | 'port' | 'username' | 'password' | 'database'
>;

const productionConfig: DatabaseConfig = {
	dialect: 'postgres',
	host: process.env.DATABASE_HOST,
	port: 5430,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
};

const developmentConfig: DatabaseConfig = {
	dialect: 'mysql',
	host: process.env.DATABASE_HOST,
	port: 3306,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
};

const getDatabaseConfig = (configType?: ConfigType) => {
	const config = configType ?? process.env.NODE_ENV;

	switch (config) {
		case NODE_ENV_PRODUCTION:
			return productionConfig;
		case NODE_ENV_DEVELOPMENT:
			return developmentConfig;
	}
};

export { getDatabaseConfig };
