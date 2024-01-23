'use server';

const resolveCalendar = async (
	token: string,
	googleCalendarId: string | null | undefined,
): Promise<string> => {
	if (googleCalendarId) {
		const response = await fetch(
			process.env.GOOGLE_CALENDAR_BASE_URL + '/users/me/calendarList',
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			},
		);

		const data = await response.json();

		const targetCalendar = data.items.find(
			(calendar: { id: string }) => calendar.id === googleCalendarId,
		);

		if (targetCalendar) {
			return targetCalendar.id;
		}
	}

	const response = await fetch(process.env.GOOGLE_CALENDAR_BASE_URL + '/calendars', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({
			summary: 'Match aggregator',
		}),
	});

	const targetCalendar = await response.json();

	return targetCalendar.id;
};

export { resolveCalendar };
