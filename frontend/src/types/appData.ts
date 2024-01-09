export type MatchStatus =
	| 'SCHEDULED'
	| 'LIVE'
	| 'IN_PLAY'
	| 'PAUSED'
	| 'FINISHED'
	| 'POSTPONED'
	| 'SUSPENDED'
	| 'CANCELLED';

export interface FootballTeam {
	id: number;
	leagueId: FootballLeague['id'];
	name: string;
	logo: string;
}

export interface FootballLeague {
	id: number;
	name: string;
	logo: string;
	teams: Array<FootballTeam>;
}

export interface FootballMatch {
	id: number;
	leagueId: FootballLeague['id'];
	leagueLogo: string;
	utcDate: string;
	status: MatchStatus;
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
}

export type FootballTeamsValues = Record<string, boolean>;
export type FootballLeaguesValues = Record<string, FootballTeamsValues>;
