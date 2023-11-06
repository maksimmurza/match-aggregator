import { DateTimeString } from './dates';

export type MatchStatus =
  | 'SCHEDULED'
  | 'LIVE'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'POSTPONED'
  | 'SUSPENDED'
  | 'CANCELLED';

export interface FootballMatch {
  id: number;
  leagueId: FootballLeague['id'];
  leagueLogo: string;
  utcDate: string;
  status: MatchStatus;
  homeTeam: FootballTeam;
  awayTeam: FootballTeam;
}

export interface FootballLeague {
  id: number;
  name: string;
  logo: string;
  teams: Array<FootballTeam>;
}

export interface FootballTeam {
  id: number;
  name: string;
  logo: string;
}
