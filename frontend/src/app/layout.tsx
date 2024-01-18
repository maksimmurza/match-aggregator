import Navbar from '@/components/Navbar';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {
	API_KEY,
	CLIENT_ID,
	DISCOVERY_DOCS,
	SCOPES,
} from '@/utils/googleCalendarIntegration';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// const gapiLoaded = () => {
	// 	window.gapi.load('client', async () => {
	// 		await window.gapi.client.init({
	// 			apiKey: API_KEY,
	// 			clientId: CLIENT_ID,
	// 			discoveryDocs: DISCOVERY_DOCS,
	// 			scope: SCOPES,
	// 		});
	// 	});
	// };

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
			{/* <script
				async
				defer
				src="https://apis.google.com/js/api.js"
				onLoad={gapiLoaded}
			></script> */}
		</html>
	);
}
