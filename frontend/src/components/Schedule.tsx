'use client';

import ScrollableCardList from '@/layouts/ScrollableCardList';
import {
	FootballLeague,
	FootballLeaguesValues,
	FootballMatch,
	FootballTeam,
	FootballTeamsValues,
} from '@/types/appData';
import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import GameCard from './GameCard';
import LeaguesTabs from './LeaguesTabsSchedule';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserPreferences from '@/hooks/useUserPreferences';
import useGoogleCalendar from '@/hooks/useGoogleCalendar';

interface ScheduleProps {
	schedule: Array<FootballMatch>;
	leagues: Array<FootballLeague>;
}

const Schedule: FC<PropsWithChildren<ScheduleProps>> = ({ schedule, leagues }) => {
	const { user } = useUser();
	const {
		selectedTeams,
		googleCalendarId,
		setSelectedTeams,
		updateSelectedTeams,
		updateGoogleCalendarId,
		isGameVisible,
	} = useUserPreferences(user, leagues);

	const { targetCalendarId, addGameToCalendar } = useGoogleCalendar({
		userId: user?.sub,
		googleCalendarId,
		updateGoogleCalendarId,
	});

	const insertGameEvent = useCallback(
		(game: FootballMatch) => {
			if (targetCalendarId) {
				addGameToCalendar(game, targetCalendarId);
			}
		},
		[targetCalendarId],
	);

	const displayedGames = schedule?.filter(isGameVisible);

	return (
		<div className="flex py-4 justify-center gap-4 h-screen overflow-hidden w-full relative">
			<ScrollableCardList className="bg-white flex-grow">
				{displayedGames?.length > 0 ? (
					displayedGames.map((item: FootballMatch) => {
						return (
							<GameCard
								key={item.id}
								game={item}
								addGameToCalendar={insertGameEvent}
								canBeInsertedInCalendar={!!targetCalendarId}
								className="border-b border-gray-300"
							/>
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

export default Schedule;
