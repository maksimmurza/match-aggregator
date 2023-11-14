import React, { FC, PropsWithChildren } from 'react';

const ScrollableCardList: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`[&>*]:w-full height-full shadow-lg overflow-y-auto rounded ` + className}>
      {children}
    </div>
  );
};

export default ScrollableCardList;
