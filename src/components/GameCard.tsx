/* eslint-disable @next/next/no-img-element */
import { FootballMatchApi } from '@/api/types/types';
import { FootballMatch } from '@/types/games';
import React from 'react';
import Image from 'next/image';

const GameCard = ({ status, utcDate, homeTeam, awayTeam }: FootballMatch) => {
  return (
    <div className="flex align-middle">
      <img className="w-24" src={homeTeam.logo} alt="Home team logo" />
      {homeTeam.name} - {awayTeam.name} ({utcDate})
      <img className="w-24" src={awayTeam.logo} alt="Home team logo" />
    </div>
  );
};

export default GameCard;
