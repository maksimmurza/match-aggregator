/* eslint-disable @next/next/no-img-element */

'use client';

import { FootballLeague } from '@/types/games';
import React, { FC, PropsWithChildren, memo } from 'react';
import { Checkbox } from '../app/materialTailwind';
import { FaMinus } from 'react-icons/fa';

interface LeagueCheckboxProps {
	league: FootballLeague;
	state: 'checked' | 'unchecked' | 'indeterminate';
	onChange: (leagueId: FootballLeague['id'], newState: boolean) => void;
}

const LeagueCheckbox: FC<PropsWithChildren<LeagueCheckboxProps>> = ({
	league,
	state,
	onChange,
}) => {
	return (
		<div className="flex justify-center items-center">
			<Checkbox
				// "@types/react": "18.2.20" bug
				crossOrigin={''}
				checked={state !== 'unchecked'}
				icon={state === 'indeterminate' && <FaMinus />}
				onChange={(event) => {
					event.stopPropagation();
					onChange(league.id, state === 'unchecked' ? true : false);
				}}
				onClick={(event) => event.stopPropagation()}
			/>
			<img className="w-10" src={league.logo} alt={league.name} />
		</div>
	);
};

export default memo(LeagueCheckbox);
