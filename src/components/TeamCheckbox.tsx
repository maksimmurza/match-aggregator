import { FootballTeam } from '@/types/games';
import React, { FC, PropsWithChildren } from 'react';
import { Checkbox } from '../app/materialTailwind';

interface TeamCheckboxProps {
  team: FootballTeam;
  checked: boolean;
  onChange: (teamId: FootballTeam['id'], newState: boolean) => void;
}

const TeamCheckbox: FC<PropsWithChildren<TeamCheckboxProps>> = ({ team, checked, onChange }) => {
  return <Checkbox crossOrigin={false} checked={checked} label={team.name} />;
};

export default TeamCheckbox;
