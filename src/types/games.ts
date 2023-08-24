export type MatchStatus = 'SCHEDULED';

export interface FootballMatch {
  id: number;
  utcDate: string;
  status: MatchStatus;
  score: any;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
}
