import React, { CSSProperties, FC, PropsWithChildren } from 'react';

const ScrollableCardList: FC<PropsWithChildren<{ className?: string; style?: CSSProperties }>> = ({
	children,
	className = '',
	style,
}) => {
	return (
		<div
			className={`[&>*]:w-full height-full shadow-lg overflow-y-auto rounded ` + className}
			style={{ ...style }}
		>
			{children}
		</div>
	);
};

export default ScrollableCardList;
