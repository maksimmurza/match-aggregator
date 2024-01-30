'use client';

import React, { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '../components';

interface TabsPanelProps {
	data: Array<{
		tabLabel: string | ReactNode;
		tabValue: string;
		tabContent: string | ReactNode;
	}>;
}

const TabsPanel: FC<PropsWithChildren<TabsPanelProps>> = ({ data }) => {
	const [activeTab, setActiveTab] = useState(data[0].tabValue);
	return (
		<Tabs value={activeTab} className="h-full">
			<TabsHeader
				className="bg-transparent mb-2 pl-0"
				indicatorProps={{
					className: 'bg-white shadow-none !text-gray-900 rounded-lg',
				}}
			>
				{data.map(({ tabLabel, tabValue }, index) => (
					<Tab
						className="px-4"
						key={tabValue}
						value={tabValue}
						onClick={() => {
							setActiveTab(tabValue);
						}}
					>
						{tabLabel}
					</Tab>
				))}
			</TabsHeader>
			<TabsBody className="bg-white rounded-lg h-[calc(100%-68px)] overflow-auto">
				{data.map(({ tabValue, tabContent }) => (
					<TabPanel key={tabValue} value={tabValue}>
						{activeTab === tabValue && tabContent}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
};

export default TabsPanel;
