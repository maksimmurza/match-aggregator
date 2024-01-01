import Navbar from '@/components/Navbar';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<UserProvider>
				<body className="bg-gray-100 flex justify-center">
					<div className="flex flex-col overflow-hidden max-w-screen-2xl mx-4 relative">
						<Navbar className="w-screen" />
						{children}
					</div>
				</body>
			</UserProvider>
		</html>
	);
}
