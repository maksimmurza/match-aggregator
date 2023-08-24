import React, { FC, PropsWithChildren } from 'react';

const ScrollableCardList: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className="shadow-sm overflow-y-auto overflow-x-hidden flex-col align-items-stretch">
      {children}
    </div>
  );
};

export default ScrollableCardList;
