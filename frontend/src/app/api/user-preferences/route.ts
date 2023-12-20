import { NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const GET = withApiAuthRequired(async () => {
	const { accessToken } = await getAccessToken();
	const response = await fetch(
		process.env.REACT_APP_SERVER_BASE_URL + '/user-preferences',
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
		},
	);

	const userPreferences = await response.json();
	return NextResponse.json(userPreferences);
});

export { GET };