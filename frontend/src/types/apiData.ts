import { DateString, DateTimeString, YYYY } from '@/types/dates';
import { LEAGUES_CODES } from '../constants/requestOptions';
import { FootballTeamsValues, MatchStatus } from '@/types/appData';

// type equals set of LEAGUES_CODES values
export type LeagueCode<T = typeof LEAGUES_CODES> = T[keyof T];

interface FootballPlayer {
	id: number;
	name: string;
	position: string;
	dateOfBirth: string;
	nationality: string;
}

interface FootballTeamShortApi {
	id: number;
	name: string;
	crest: string;
	tla: string;
}

export interface FootballTeamApi extends FootballTeamShortApi {
	coach: string;
	squad: Array<FootballPlayer>;
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
	homeTeam: FootballTeamShortApi;
	awayTeam: FootballTeamShortApi;
}

export interface LeagueScheduleResponse {
	filters: {
		status?: Array<MatchStatus>;
		season?: string;
	};
	competition: FootballCompetitionApi;
	matches: Array<FootballMatchApi>;
}

export interface LeagueTeamsResponse {
	competition: FootballCompetitionApi;
	teams: Array<FootballTeamApi>;
}

export type UserPreferences = {
	selectedTeams: FootballTeamsValues;
	googleCalendarId: string;
};

export interface FootballTeamStandingApi {
	position: number;
	team: FootballTeamApi;
	playedGames: number;
	won: number;
	draw: number;
	lost: number;
	points: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
}

export interface LeagueStandingsResponse {
	filters: {
		season?: string;
	};
	competition: FootballCompetitionApi;
	standings: Array<{
		table: Array<FootballTeamStandingApi>;
	}>;
}
