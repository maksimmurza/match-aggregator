import { Typography } from '@/components';
import React, { FC, PropsWithChildren } from 'react';

interface TeamNameProps {
	align?: 'left' | 'right' | 'center';
	className?: string;
}

const TeamName: FC<PropsWithChildren<TeamNameProps>> = ({
	children,
	className = '',
	align = 'left',
}) => {
	return (
		<Typography
			variant="lead"
			className={`mx-4 w-64 truncate align-middle ` + className}
			style={{ textAlign: align }}
		>
			{children}
		</Typography>
	);
};

export default TeamName;
