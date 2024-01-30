import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { FootballLeaguesValues } from '../types';

@Table
export class UserPreferences extends Model {
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
	})
	id: string;

	@Column({ type: DataType.STRING })
	userId: string;

	@Column({ type: DataType.JSON })
	selectedTeams: FootballLeaguesValues;

	@Column({ type: DataType.STRING })
	googleCalendarId: string;
}
