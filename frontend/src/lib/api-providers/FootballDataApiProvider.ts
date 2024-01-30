import ApiProvider from './ApiProvider';

// TODO Promise retry
class FootballDataApiProvider extends ApiProvider {
	headers = {
		'Content-Type': 'application/json',
	};

	leagueCodes = {
		ENGLISH_PREMIER_LEAGUE: 'PL',
		SPANISH_LA_LIGA: 'PD',
		CHAMPIONS_LEAGUE: 'CL',
	};

	constructor() {
		super(process.env.REACT_APP_DATA_BASE_URL || '');
		this.setAuthorization(process.env.REACT_APP_footballDataToken || '');
	}

	setAuthorization(token: string): void {
		this.setHeader('X-Auth-Token', token);
	}
}

export default FootballDataApiProvider;
