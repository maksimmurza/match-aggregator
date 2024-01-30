import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import api from '@/utils/api-providers';

const GET = withApiAuthRequired(async (request) => {
	const userId = request.nextUrl.searchParams.get('userId');
	const googleCalendarId = request.nextUrl.searchParams.get('googleCalendarId');

	if (userId) {
		await api.calendar.resolveGoogleIdentityProviderToken(userId);
	}

	if (googleCalendarId) {
		const data = (await api.calendar.fetch('/users/me/calendarList', {
			method: 'GET',
		})) as unknown as { items: Array<{ id: string }> };

		const targetCalendar = data.items.find(
			(calendar) => calendar.id === googleCalendarId,
		);

		if (targetCalendar) {
			return NextResponse.json({ targetCalendarId: targetCalendar.id });
		}
	}

	const targetCalendar = (await api.calendar.fetch('/calendars', {
		method: 'POST',
		body: JSON.stringify({
			summary: 'Match aggregator',
		}),
	})) as unknown as { id: string };

	return NextResponse.json({ targetCalendarId: targetCalendar.id });
});

export { GET };
