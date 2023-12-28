import {
	FootballLeague,
	FootballLeaguesValues,
	FootballTeamsValues,
} from '@/types/games';

const createSelectedTeamsObject = (leagues: Array<FootballLeague>) => {
	const initialSelectedTeams: FootballLeaguesValues = {};
	leagues.forEach((league) => {
		const teamsObject: FootballTeamsValues = {};
		league.teams.forEach((team) => {
			teamsObject[team.id] = true;
		});
		initialSelectedTeams[league.id] = teamsObject;
	});
	return initialSelectedTeams;
};

export { createSelectedTeamsObject };
