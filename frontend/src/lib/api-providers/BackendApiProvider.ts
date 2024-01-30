import ApiProvider from './ApiProvider';

class BackendApiProvider extends ApiProvider {
	headers = {
		'Content-Type': 'application/json',
	};

	constructor() {
		super(process.env.REACT_APP_SERVER_BASE_URL || '');
	}
}

export default BackendApiProvider;
