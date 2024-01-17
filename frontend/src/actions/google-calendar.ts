'use server';
import { google } from 'googleapis';

const getCalendar = (token: string) => {
	const oauth2Client = new google.auth.OAuth2();
	oauth2Client.setCredentials({ access_token: token });
	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
	calendar.calendarList.list({}, (err, res) => {
		if (err) {
			console.error('The API returned an error: ' + err);
			return;
		}
		const calendars = res?.data.items;
		if (calendars?.length) {
			console.log('Calendars:');
			calendars.forEach((calendar) => {
				console.log(`${calendar.summary} - ${calendar.id}`);
			});
		} else {
			console.log('No calendars found.');
		}
	});
};

export { getCalendar };
