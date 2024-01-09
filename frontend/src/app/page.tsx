import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export default async function Home() {
	redirect('/schedule', RedirectType.replace);
}
