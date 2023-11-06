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
  utcDate: DateTimeString;
  status: MatchStatus;
  // score: any;
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
