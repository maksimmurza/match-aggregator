import React, { ChangeEvent, FC, PropsWithChildren, memo } from 'react';
import { FootballLeague, FootballTeam } from '@/types/appData';
import { Checkbox } from '.';

interface TeamCheckboxProps {
	team: FootballTeam;
	checked: boolean;
	onChange: (
		leagueId: FootballLeague['id'],
		teamId: FootballTeam['id'],
		newState: boolean,
	) => void;
}

const TeamCheckbox: FC<PropsWithChildren<TeamCheckboxProps>> = ({
	team,
	checked,
	onChange,
}) => {
	return (
		<Checkbox
			// "@types/react": "18.2.20" bug
			crossOrigin={''}
			checked={checked}
			label={team.name}
			onChange={(event) => {
				onChange(team.leagueId, team.id, !checked);
			}}
		/>
	);
};

export default memo(TeamCheckbox);
