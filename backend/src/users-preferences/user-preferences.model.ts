import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

	@Column({ defaultValue: [], type: DataType.JSON })
	unselectedTeams: Array<string>;
}
