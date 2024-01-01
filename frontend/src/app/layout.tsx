import Navbar from '@/components/Navbar';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<UserProvider>
				<body className="bg-gray-100 flex flex-col overflow-hidden">
					<Navbar className="" />
					{children}
				</body>
			</UserProvider>
		</html>
	);
}
