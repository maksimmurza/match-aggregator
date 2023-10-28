import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballMatch } from '@/types/games';
import { getEnglishPremierLeagueSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi } from '@/api/types/types';

export default async function Home() {
  const data = await getEnglishPremierLeagueSchedule();

  return (
    <main /* className="flex min-h-screen flex-col items-center justify-between p-24" */>
      {data && (
        <ScrollableCardList>
          {data.matches.map((item: FootballMatchApi) => {
            return <GameCard key={item.id} {...item} />;
          })}
        </ScrollableCardList>
      )}
    </main>
  );
}
