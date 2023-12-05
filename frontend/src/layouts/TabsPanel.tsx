import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '../app/materialTailwind';

interface TabsPanelProps {
  data: Array<{
    tabLabel: string | ReactNode;
    tabValue: string;
    tabContent: string | ReactNode;
  }>;
}

const TabsPanel: FC<PropsWithChildren<TabsPanelProps>> = ({ data }) => {
  return (
    <Tabs>
      <TabsHeader
        className="bg-transparent mb-2 pl-0"
        indicatorProps={{
          className: 'bg-white shadow-none !text-gray-900 rounded-lg',
        }}
      >
        {data.map(({ tabLabel, tabValue }, index) => (
          <Tab className="px-4" key={tabValue} value={tabValue}>
            {tabLabel}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="bg-white rounded-lg h-full overflow-y-auto">
        {data.map(({ tabValue, tabContent }) => (
          <TabPanel key={tabValue} value={tabValue}>
            {tabContent}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default TabsPanel;
