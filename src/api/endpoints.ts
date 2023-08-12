// TODO: type league: LeagueKey
export const COMPETITION_SCHEDULE = (
  league: string,
  query: string = 'matches?status=SCHEDULED'
) => {
  return `https://api.football-data.org/v4/competitions/${league}/${query}`;
};

export const CURRENT_SEASON_LEAGUES_URL =
  'https://api-football-v1.p.rapidapi.com/v2/leagues/current/';
