import { NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import api from '@/utils/api-providers';

const GET = withApiAuthRequired(async () => {
	// Observer ?
	const { accessToken } = await getAccessToken();
	const userPreferences = await api.backend.fetch('/user-preferences', {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
	});
	return NextResponse.json(userPreferences);
});

export { GET };
