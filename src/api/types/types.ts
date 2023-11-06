import { DateString, DateTimeString, YYYY } from '@/types/dates';
import { LEAGUES_CODES, AUTH_HEADERS } from '../constants/requestOptions';
import { MatchStatus } from '@/types/games';

// type equals set of LEAGUES_CODES values
export type LeagueCode<T = typeof LEAGUES_CODES> = T[keyof T];

// ...Api postfix is for types that we expect from api, same types without
// postfix are for internal usege and they are placed (or will be) in global types folder
interface FootballTeamApi {
  id: number;
  name: string;
  crest: string;
}

interface FootballCompetitionApi {
  id: number;
  name: string;
  code: LeagueCode;
  emblem: string;
}

export interface FootballMatchApi {
  id: number;
  utcDate: string;
  status: MatchStatus;
  competition: FootballCompetitionApi;
  homeTeam: FootballTeamApi;
  awayTeam: FootballTeamApi;
}

export interface LeagueScheduleApi {
  filters: {
    status?: Array<MatchStatus>;
    season?: string;
  };
  competition: FootballCompetitionApi;
  matches: Array<FootballMatchApi>;
}

export interface LeagueTeamsApi {
  competition: FootballCompetitionApi;
  teams: Array<{
    id: number;
    name: string;
    shortName: string;
    crest: string;
  }>;
}
