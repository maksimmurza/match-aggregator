'use client';

import ScrollableCardList from '@/components/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/appData';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import GameCard from './GameCard';
import LeaguesTabs from './LeaguesTabsSchedule';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserPreferences from '@/hooks/useUserPreferences';

interface ScheduleProps {
	schedule: Array<FootballMatch>;
	leagues: Array<FootballLeague>;
}

const Schedule: FC<PropsWithChildren<ScheduleProps>> = ({ schedule, leagues }) => {
	const { user } = useUser();
	const { userPreferences, setSelectedTeams, updateSelectedTeams, isGameVisible } =
		useUserPreferences(user, leagues);

	const insertGameEvent = useCallback(
		async (game: FootballMatch) => {
			if (userPreferences.googleCalendarId) {
				await fetch('/api/google-calendar/events', {
					method: 'POST',
					body: JSON.stringify({
						game,
						googleCalendarId: userPreferences.googleCalendarId,
					}),
				});
			}
		},
		[userPreferences.googleCalendarId],
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
								canBeInsertedInCalendar={!!userPreferences.googleCalendarId}
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
					selectedTeams={userPreferences.selectedTeams}
					setSelectedTeams={setSelectedTeams}
					updateSelectedTeams={updateSelectedTeams}
				/>
			</div>
		</div>
	);
};

export default Schedule;
