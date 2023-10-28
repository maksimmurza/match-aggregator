import { DateString, DateTimeString } from '@/types/dates';
import { LEAGUES_CODES, AUTH_HEADERS } from '../constants/requestOptions';
import { MatchStatus } from '@/types/games';

// type equals set of LEAGUES_CODES values
export type LeagueCode<T = typeof LEAGUES_CODES> = T[keyof T];

// ...Api postfix is for types that we expect from api, same types without
// postfix are for internal usege and they are placed (or will be) in global types folder
interface FootballTeamApi {
  id: number;
  name: string;
}

interface ScoreApi {
  homeTeam: number;
  awayTeam: number;
}

export interface FootballMatchApi {
  id: number;
  // season: {
  //   id: number;
  //   startDate: DateString;
  //   endDate: DateString;
  //   currentMatchday: number;
  // };
  utcDate: DateTimeString;
  status: MatchStatus;
  // score: {
  //   winner: string;
  //   fullTime: ScoreApi;
  //   halfTime: ScoreApi;
  //   extraTime: ScoreApi;
  //   penalties: ScoreApi;
  // };
  homeTeam: FootballTeamApi;
  awayTeam: FootballTeamApi;
}

export interface LeagueScheduleApi {
  count: number;
  filters: {
    status: Array<MatchStatus>;
  };
  competition: {
    id: number;
    name: string;
    code: LeagueCode;
  };
  matches: Array<FootballMatchApi>;
}
