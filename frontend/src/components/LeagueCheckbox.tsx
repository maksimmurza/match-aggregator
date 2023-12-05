/* eslint-disable @next/next/no-img-element */

'use client';

import { FootballLeague } from '@/types/games';
import React, { FC, PropsWithChildren } from 'react';
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
        defaultChecked
        crossOrigin={false}
        checked={state !== 'unchecked'}
        icon={state === 'indeterminate' && <FaMinus />}
        onChange={() => onChange(league.id, state === 'unchecked' ? true : false)}
      />
      <img className="w-10" src={league.logo} alt={league.name} />
    </div>
  );
};

export default LeagueCheckbox;
