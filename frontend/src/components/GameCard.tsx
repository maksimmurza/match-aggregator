/* eslint-disable @next/next/no-img-element */
import { FootballMatchApi } from '@/types/apiData';
import { FootballMatch } from '@/types/appData';
import React, { FC, PropsWithChildren, memo } from 'react';
import Image from 'next/image';
import { prettifyDate } from '@/utils/date';
import Label from './DateLabel';
import { Button, Tooltip, Typography } from './MaterialTailwindComponents';
import TeamName from './TeamName';
import TimeLabel from './TimeLabel';
import DateLabel from './DateLabel';

const GameCard: FC<
	PropsWithChildren<{
		game: FootballMatch;
		addGameToCalendar: (game: FootballMatch) => void;
		canBeInsertedInCalendar: boolean;
		className?: string;
	}>
> = ({ game, addGameToCalendar, canBeInsertedInCalendar, className = '' }) => {
	const { status, utcDate, homeTeam, awayTeam, leagueLogo } = game;
	const { date, time } = prettifyDate(utcDate);

	return (
		<div className={`p-4 bg-white w-full ` + className}>
			{canBeInsertedInCalendar ? (
				<Tooltip
					className="bg-transparent"
					content={<div className="text-slate-500">Add to the calendar</div>}
					placement="right-end"
					animate={{
						mount: { scale: 1, x: 0 },
						unmount: { scale: 0, x: -50 },
					}}
				>
					<div
						onClick={() => addGameToCalendar(game)}
						className="flex gap-2 w-fit rounded-lg m-1 hover:bg-gray-200 hover:cursor-pointer hover:shadow-md hover:shadow-blue-gray-200 duration-200"
					>
						<DateLabel>{date}</DateLabel>
						<TimeLabel>{time}</TimeLabel>
					</div>
				</Tooltip>
			) : (
				<div className="flex gap-2 w-fit rounded-lg m-1">
					<DateLabel>{date}</DateLabel>
					<TimeLabel>{time}</TimeLabel>
				</div>
			)}

			<div className="flex justify-center items-center">
				<TeamName align="right">{homeTeam.name}</TeamName>
				<img className="w-24" src={homeTeam.logo} alt="Home team logo" />
				<span className="mx-8"> – </span>
				<img className="w-24" src={awayTeam.logo} alt="Home team logo" />
				<TeamName>{awayTeam.name}</TeamName>
			</div>
			<div className="flex justify-end">
				<img className="w-12" src={leagueLogo} alt="League logo" />
			</div>
		</div>
	);
};

export default memo(GameCard);
