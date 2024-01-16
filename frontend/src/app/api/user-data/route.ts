import { NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const GET = withApiAuthRequired(async (request) => {
	const { accessToken } = await getAccessToken();

	// get management api token
	const response = await fetch(process.env.AUTH0_ISSUER_BASE_URL + '/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
		body: JSON.stringify({
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			audience: process.env.AUTH0_ISSUER_BASE_URL + '/api/v2/',
			grant_type: 'client_credentials',
		}),
	});

	const managementApiData = await response.json();

	const userId = request.nextUrl.searchParams.get('userId');

	const response1 = await fetch(
		process.env.AUTH0_ISSUER_BASE_URL + `/api/v2/users/${userId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${managementApiData.access_token}`,
			},
		},
	);

	const userData = await response1.json();
	return NextResponse.json(userData);
});

export { GET };
