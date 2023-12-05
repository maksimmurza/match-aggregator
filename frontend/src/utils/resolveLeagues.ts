import { LeagueTeamsResponse } from '@/api/types/types';
import { FootballLeague } from '@/types/games';

const resolveLeagues = (leaguesResponse: Array<LeagueTeamsResponse>): Array<FootballLeague> => {
  return leaguesResponse.map((response, index) => {
    return {
      id: response.competition.id,
      name: response.competition.name,
      logo: response.competition.emblem,
      teams: response.teams.map(team => {
        return {
          id: team.id,
          leagueId: response.competition.id,
          name: team.name,
          logo: team.crest,
        };
      }),
    };
  });
};

export default resolveLeagues;
