export type MatchStatus = 'SCHEDULED' | 'ACTIVE';

export interface FootballMatch {
  id: number;
  utcDate: string;
  status: MatchStatus;
  score: any;
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface League {
  id: number;
  name: string;
  logo: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
