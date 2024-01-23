import { NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const PUT = withApiAuthRequired(async (request) => {
	const { accessToken } = await getAccessToken();
	const body = await request.json();
	const response = await fetch(
		process.env.REACT_APP_SERVER_BASE_URL + '/user-preferences/google-calendar-id',
		{
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
		},
	);

	const responseJson = await response.json();
	return NextResponse.json(responseJson);
});

export { PUT };
