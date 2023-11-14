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
        className="bg-transparent"
        indicatorProps={{
          className: 'bg-gray-900/10 shadow-none !text-gray-900',
        }}
      >
        {data.map(({ tabLabel, tabValue }) => (
          <Tab key={tabValue} value={tabValue}>
            {tabLabel}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
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
