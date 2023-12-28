import React, { FC } from 'react';
import { Button } from '../app/materialTailwind';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const ProfileClient: FC = () => {
	const { user, isLoading, error } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	if (!user) {
		return (
			<>
				<a href="/api/auth/login">
					<Button fullWidth variant="text" size="sm" className="">
						<span>Log In</span>
					</Button>
				</a>
				<a href="/api/auth/login">
					<Button fullWidth variant="gradient" size="sm" className="">
						<span>Sign up</span>
					</Button>
				</a>
			</>
		);
	}

	return (
		<div>
			{user.name}, <Link href="/api/auth/logout">Logout</Link>
		</div>
	);
};

export default ProfileClient;
