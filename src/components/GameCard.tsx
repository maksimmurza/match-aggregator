import { FootballMatch } from '@/types/games';
import React from 'react';

const GameCard = ({ status, utcDate, homeTeam, awayTeam }: FootballMatch) => {
  return (
    <div>
      {homeTeam.name} - {awayTeam.name}
    </div>
  );
};

export default GameCard;
