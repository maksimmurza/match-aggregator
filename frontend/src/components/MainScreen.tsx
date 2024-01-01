'use client';

import ScrollableCardList from '@/layouts/ScrollableCardList';
import {
	FootballLeague,
	FootballLeaguesValues,
	FootballMatch,
	FootballTeam,
	FootballTeamsValues,
} from '@/types/games';
import React, { FC, PropsWithChildren, useState } from 'react';
import GameCard from './GameCard';
import LeaguesTabs from './LeaguesTabs';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserPreferences from '@/hooks/useUserPreferences';

interface MainScreenProps {
	schedule: Array<FootballMatch>;
	leagues: Array<FootballLeague>;
}

const MainScreen: FC<PropsWithChildren<MainScreenProps>> = ({ schedule, leagues }) => {
	const { user } = useUser();
	const { selectedTeams, setSelectedTeams, updateSelectedTeams, isGameShown } =
		useUserPreferences(user, leagues);

	const displayedGames = schedule?.filter(isGameShown);

	return (
		<div className="flex p-4 justify-center gap-4 w-screen h-screen overflow-hidden">
			<ScrollableCardList className="bg-white" style={{ width: '900px' }}>
				{displayedGames?.length > 0 ? (
					displayedGames.map((item: FootballMatch) => {
						return (
							<GameCard key={item.id} {...item} className="border-b border-gray-300" />
						);
					})
				) : (
					<div className="p-3">No selected teams</div>
				)}
			</ScrollableCardList>

			<div className="overflow-hidden relative">
				<LeaguesTabs
					leagues={leagues}
					selectedTeams={selectedTeams}
					setSelectedTeams={setSelectedTeams}
					updateSelectedTeams={updateSelectedTeams}
				/>
			</div>
		</div>
	);
};

export default MainScreen;
