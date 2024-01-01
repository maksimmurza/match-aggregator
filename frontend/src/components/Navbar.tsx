'use client';

import React, { FC, PropsWithChildren, useState, useEffect } from 'react';
import {
	Navbar as NavbarMaterial,
	Collapse,
	Typography,
	IconButton,
	Button,
} from '../app/materialTailwind';
import { HiBars3 } from 'react-icons/hi2';
import { IoCloseOutline } from 'react-icons/io5';
import ProfileClient from './ProfileClient';

const NavbarItem: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
			<a href="#" className="flex items-center hover:text-blue-500 transition-colors">
				{children}
			</a>
		</Typography>
	);
};

const NavbarList: FC = () => {
	return (
		<ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<NavbarItem>Schedule</NavbarItem>
			<NavbarItem>Results</NavbarItem>
			<NavbarItem>Standings</NavbarItem>
			<NavbarItem>Hightlights</NavbarItem>
			<NavbarItem>About</NavbarItem>
		</ul>
	);
};

const Navbar: FC<PropsWithChildren<{ className: string }>> = ({ className }) => {
	const [openNav, setOpenNav] = useState(false);

	const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div className="pt-4 relative flex justify-center">
			<NavbarMaterial className={`px-6 py-3 flex-grow-0 ${className}`}>
				<div className="flex items-center justify-between text-blue-gray-900">
					<Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5">
						Match aggregator
					</Typography>
					<div className="hidden lg:flex gap-8">
						<NavbarList />
						<div className="flex items-center gap-x-1">
							<ProfileClient />
						</div>
					</div>
					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<IoCloseOutline className="h-6 w-6" strokeWidth={2} />
						) : (
							<HiBars3 className="h-6 w-6" strokeWidth={2} />
						)}
					</IconButton>
				</div>
				<Collapse open={openNav}>
					<NavbarList />

					<ProfileClient />
				</Collapse>
			</NavbarMaterial>
		</div>
	);
};

export default Navbar;
