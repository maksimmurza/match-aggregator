import { NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import api from '@/lib/api-providers';

const PUT = withApiAuthRequired(async (request) => {
	const { accessToken } = await getAccessToken();
	const body = await request.json();
	const response = await api.backend.fetch('/user-preferences/selected-teams', {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
	});

	return NextResponse.json(response);
});

export { PUT };
