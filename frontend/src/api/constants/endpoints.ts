import { LeagueCode } from '../types/types';

// football-data api
export const COMPETITION_SCHEDULE = (
	leagueCode: LeagueCode,
	query: string = 'matches?status=SCHEDULED',
) => {
	return `/competitions/${leagueCode}/${query}`;
};

export const COMPETITION_STANDINGS = (leagueCode: LeagueCode) => {
	return `/competitions/${leagueCode}/standings`;
};

// rapid api
export const COMPETITION_TEAMS = (leagueCode: LeagueCode) =>
	`/competitions/${leagueCode}/teams`;

// request for Next routes
// export const USER_PREFERENCES = (userId: string) => `/api/user-preferences/${userId}`;

// request for external Nest API
// export const USER_PREFERENCES_API = (userId: string) => `/user-preferences/${userId}`;
