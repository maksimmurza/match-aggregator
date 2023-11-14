import React, { FC, PropsWithChildren } from 'react';
import { FaCalendar } from 'react-icons/fa';

const DateLabel: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div
      className={`flex gap-1 items-center justify-center px-3 py-1/5 py-1 m-1 bg-gray-200 text-gray-600 rounded-lg`}
    >
      <FaCalendar />
      {children}
    </div>
  );
};

export default DateLabel;
