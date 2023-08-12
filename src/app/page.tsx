import { COMPETITION_SCHEDULE } from '@/api/endpoints';

export default async function Home() {
  const response = await fetch(COMPETITION_SCHEDULE('PL'), {
    headers: {
      'X-Auth-Token': `${process.env.REACT_APP_footballDataToken}`,
    },
  });
  const data = await response.json();

  return (
    <main /* className="flex min-h-screen flex-col items-center justify-between p-24" */>
      {data ? data.matches.length : 'no'}
    </main>
  );
}
