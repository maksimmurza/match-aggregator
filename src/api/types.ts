import { CHAMPIONS_LEAGUE, ENGLISH_PREMIER_LEAGUE, SPANISH_LA_LIGA } from './constants';

export type LeagueKey =
  | typeof ENGLISH_PREMIER_LEAGUE
  | typeof SPANISH_LA_LIGA
  | typeof CHAMPIONS_LEAGUE;
