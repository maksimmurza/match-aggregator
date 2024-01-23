import React, { FC, PropsWithChildren } from 'react';
import { FaClock } from 'react-icons/fa';

const TimeLabel: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<div
			className={`flex gap-1 items-center justify-center px-3 py-1/5 py-1 bg-gray-200 text-gray-600 rounded-lg`}
		>
			<FaClock className="color-gray-300" />
			{children}
		</div>
	);
};

export default TimeLabel;
