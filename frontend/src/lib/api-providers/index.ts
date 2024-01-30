import Auth0ApiProvider from './Auth0ApiProvider';
import BackendApiProvider from './BackendApiProvider';
import FootballDataApiProvider from './FootballDataApiProvider';
import GoogleCalendarApiProvider from './GoogleCalendarApiProvider';

const auth0ApiProvider = new Auth0ApiProvider();
const backendApiProvider = new BackendApiProvider();
const footballDataApiProvider = new FootballDataApiProvider();
const googleCalendarApiProvider = new GoogleCalendarApiProvider();

const api = {
	auth0: auth0ApiProvider,
	backend: backendApiProvider,
	data: footballDataApiProvider,
	calendar: googleCalendarApiProvider,
};

export default api;
