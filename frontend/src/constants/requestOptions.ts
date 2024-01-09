const DATA_BASE_URL = process.env.REACT_APP_DATA_BASE_URL;

const DATA_API_HEADERS = {
	'X-Auth-Token': process.env.REACT_APP_footballDataToken || '',
};

const LEAGUES_CODES = {
	ENGLISH_PREMIER_LEAGUE: 'PL',
	SPANISH_LA_LIGA: 'PD',
	CHAMPIONS_LEAGUE: 'CL',
} as const;

export { LEAGUES_CODES, DATA_API_HEADERS, DATA_BASE_URL };
