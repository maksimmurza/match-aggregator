'use server';

const getCalendar = async (token: string): Promise<string> => {
	const response = await fetch(
		'https://www.googleapis.com/calendar/v3/users/me/calendarList',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		},
	);

	const data = await response.json();

	const targetCalendar = data.items.find(
		(calendar: any) => calendar.summary === 'Match aggregator',
	);

	if (targetCalendar) {
		return targetCalendar.id;
	} else {
		// console.log(token);
		const response = await fetch('https://www.googleapis.com/calendar/v3/calendars', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			// TODO: remember id
			body: JSON.stringify({
				summary: 'Match aggregator',
			}),
		});

		const targetCalendar = await response.json();

		return targetCalendar.id;
	}
};

export { getCalendar };
