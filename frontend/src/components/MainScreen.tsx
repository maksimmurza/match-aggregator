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
		<div className="flex py-4 justify-center gap-4 h-screen overflow-hidden w-full relative">
			<ScrollableCardList className="bg-white flex-grow">
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

			<div className="overflow-hidden relative min-w-[300px]">
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
