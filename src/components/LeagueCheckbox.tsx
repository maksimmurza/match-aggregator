/* eslint-disable @next/next/no-img-element */
import { FootballLeague } from '@/types/games';
import React, { FC, PropsWithChildren } from 'react';
import { Checkbox } from '../app/materialTailwind';

interface LeagueCheckboxProps {
  league: FootballLeague;
  checked: boolean;
  onChange: (leagueId: FootballLeague['id'], newState: boolean) => void;
}

const LeagueCheckbox: FC<PropsWithChildren<LeagueCheckboxProps>> = ({
  league,
  checked,
  onChange,
}) => {
  return (
    <div>
      <Checkbox
        defaultChecked
        crossOrigin={false}
        label={<img className="w-10" src={league.logo} alt={league.name} />}
      />
    </div>
  );
};

export default LeagueCheckbox;
