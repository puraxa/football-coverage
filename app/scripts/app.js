import {request} from './request.mjs';
import * as results from './results.mjs';
import {handleError} from './handleError.mjs';
import {parseData} from './parseData.mjs';
import {showLeagueNavigation} from './leagueNav.mjs';
import * as tables from './tables.mjs';
import * as teams from './team.mjs';

window.request = request;
window.loadResults = results.loadResults;
window.showMatch = results.showMatch;
window.handleError = handleError;
window.parseData = parseData;
window.showLeagueNavigation = showLeagueNavigation;
window.showStandings = tables.showStandings;
window.loadTables = tables.loadTables;
window.optionTeams = teams.optionTeams;
window.optionLeague = teams.optionLeague;
window.listTeams = teams.listTeams;
window.loadTeams = teams.loadTeams;
window.detailed = teams.detailed;
window.showTeamDetailed = teams.showTeamDetailed;
window.showDate = teams.showDate;

let competitions = [];
window.competitions = competitions;



