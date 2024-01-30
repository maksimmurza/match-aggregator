import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import api from '@/lib/api-providers';

const POST = withApiAuthRequired(async (request) => {
	const body = await request.json();
	const { game, googleCalendarId } = body;
	const { homeTeam, awayTeam, utcDate } = game;
	const response = await api.calendar.fetch(`/calendars/${googleCalendarId}/events`, {
		method: 'POST',
		body: JSON.stringify({
			'summary': `${homeTeam.name} - ${awayTeam.name}`,
			'start': {
				'dateTime': utcDate,
			},
			'end': {
				'dateTime': utcDate,
			},
		}),
	});

	return NextResponse.json(response);
});

export { POST };
