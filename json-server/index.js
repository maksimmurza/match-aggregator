import teamsPL from './data/teamsPL.js';
import teamsPD from './data/teamsPD.js';
import teamsCL from './data/teamsCL.js';
import matchesPL from './data/matchesPL.js';
import matchesPD from './data/matchesPD.js';
import matchesCL from './data/matchesCL.js';

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
