import { FootballMatchApi, LeagueScheduleResponse } from '@/api/types/types';
import { FootballMatch } from '@/types/games';
import { isAfter } from 'date-fns';

const resolveSchedule = (scheduleResponse: Array<LeagueScheduleResponse>): Array<FootballMatch> => {
  return scheduleResponse
    .reduce(
      (allMatches: Array<FootballMatchApi>, response) => [...allMatches, ...response.matches],
      []
    )
    .map(footballMatch => {
      return {
        id: footballMatch.id,
        leagueId: footballMatch.competition.id,
        leagueLogo: footballMatch.competition.emblem,
        utcDate: footballMatch.utcDate,
        status: footballMatch.status,
        homeTeam: {
          id: footballMatch.homeTeam.id,
          name: footballMatch.homeTeam.name,
          logo: footballMatch.homeTeam.crest,
        },
        awayTeam: {
          id: footballMatch.awayTeam.id,
          name: footballMatch.awayTeam.name,
          logo: footballMatch.awayTeam.crest,
        },
      };
    })
    .sort((a, b) => {
      const aDate = new Date(a.utcDate);
      const bDate = new Date(b.utcDate);

      if (isAfter(aDate, bDate)) {
        return 1;
      }

      return -1;
    });
};

export default resolveSchedule;
