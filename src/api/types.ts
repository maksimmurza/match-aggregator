import { LEAGUES_KEYS, AUTH_HEADERS } from './constants';

// type equals set of LEAGUES_KEYS values
export type LeagueKey<T = typeof LEAGUES_KEYS> = T[keyof T];
