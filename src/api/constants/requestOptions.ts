const BASE_URLS = {
  footballDataApi: 'https://api.football-data.org/v4',
  rapidAPI: 'https://api-football-v1.p.rapidapi.com/v2',
};

const AUTH_HEADERS = {
  footballDataApi: {
    'X-Auth-Token': `${process.env.REACT_APP_footballDataToken}`,
  },
  rapidAPI: {
    'x-rapidapi-key': `${process.env.REACT_APP_rapidApiToken}`,
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
  },
};

const LEAGUES_CODES = {
  ENGLISH_PREMIER_LEAGUE: 'PL',
  SPANISH_LA_LIGA: 'PD',
  CHAMPIONS_LEAGUE: 'CL',
} as const;

export { BASE_URLS, AUTH_HEADERS, LEAGUES_CODES };
