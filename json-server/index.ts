import teamsPL from './data/teamsPL';
import teamsPD from './data/teamsPD';
import teamsCL from './data/teamsCL';
import matchesPL from './data/matchesPL';
import matchesPD from './data/matchesPD';
import matchesCL from './data/matchesCL';

import pkg from 'json-server';
const { create, router, defaults } = pkg;
const server = create();
const middlewares = defaults();

server.use(middlewares);

server.get('/competitions/PL/matches', (req, res) => {
	res.json(matchesPL);
});
server.get('/competitions/PD/matches', (req, res) => {
	res.json(matchesPD);
});
server.get('/competitions/CL/matches', (req, res) => {
	res.json(matchesCL);
});
server.get('/competitions/PL/teams', (req, res) => {
	res.json(teamsPL);
});
server.get('/competitions/PD/teams', (req, res) => {
	res.json(teamsPD);
});
server.get('/competitions/CL/teams', (req, res) => {
	res.json(teamsCL);
});

server.listen(3002, () => {
	console.log('JSON Server is running');
});
