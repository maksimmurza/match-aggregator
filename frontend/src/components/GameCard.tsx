/* eslint-disable @next/next/no-img-element */
import { FootballMatchApi } from '@/types/apiData';
import { FootballMatch } from '@/types/appData';
import React, { FC, PropsWithChildren, memo } from 'react';
import Image from 'next/image';
import { prettifyDate } from '@/utils/date';
import Label from './DateLabel';
import { Typography } from './MaterialTailwindComponents';
import TeamName from './TeamName';
import TimeLabel from './TimeLabel';
import DateLabel from './DateLabel';

const GameCard: FC<PropsWithChildren<FootballMatch & { className?: string }>> = ({
	status,
	utcDate,
	homeTeam,
	awayTeam,
	leagueLogo,
	className = '',
}) => {
	const { date, time } = prettifyDate(utcDate);

	return (
		<div className={`p-4 bg-white w-full ` + className}>
			<div className="flex gap-2">
				<DateLabel>{date}</DateLabel>
				<TimeLabel>{time}</TimeLabel>
			</div>
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
