const BASE_URLS = 'https://api.football-data.org/v4';

const AUTH_HEADERS = {
  'X-Auth-Token': `${process.env.REACT_APP_footballDataToken}`,
};

const LEAGUES_CODES = {
  ENGLISH_PREMIER_LEAGUE: 'PL',
  SPANISH_LA_LIGA: 'PD',
  CHAMPIONS_LEAGUE: 'CL',
} as const;

export { BASE_URLS, AUTH_HEADERS, LEAGUES_CODES };
