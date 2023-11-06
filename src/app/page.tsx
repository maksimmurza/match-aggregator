import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballMatch } from '@/types/games';
import { getLeagueSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi } from '@/api/types/types';
import { LEAGUES_CODES } from '@/api/constants/requestOptions';

export default async function Home() {
  const data = await getLeagueSchedule(LEAGUES_CODES.ENGLISH_PREMIER_LEAGUE);

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
