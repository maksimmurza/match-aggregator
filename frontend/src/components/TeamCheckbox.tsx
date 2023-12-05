import { FootballLeague, FootballTeam } from '@/types/games';
import React, { ChangeEvent, FC, PropsWithChildren } from 'react';
import { Checkbox } from '../app/materialTailwind';

interface TeamCheckboxProps {
  team: FootballTeam;
  checked: boolean;
  onChange: (leagueId: FootballLeague['id'], teamId: FootballTeam['id'], newState: boolean) => void;
}

const TeamCheckbox: FC<PropsWithChildren<TeamCheckboxProps>> = ({ team, checked, onChange }) => {
  return (
    <Checkbox
      crossOrigin={false}
      checked={checked}
      label={team.name}
      onChange={event => {
        onChange(team.leagueId, team.id, !checked);
      }}
    />
  );
};

export default TeamCheckbox;
