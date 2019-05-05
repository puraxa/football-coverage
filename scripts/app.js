let token = '4ab239f4b7de4e06a40b536dc77c3a4a';
let competitions = [];
let fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "X-Auth-Token": token,
    }    
}
const request = async(url) => {
    const response = await fetch(url,fetchOptions);
    let data = await response.json();

    return response.ok ? data : Promise.reject(data);
}

function handleError(error){
    document.getElementsByClassName('results')[0].innerHTML = `${error.message}`;
    console.log(document.getElementsByClassName('results'));
    document.getElementsByClassName('results')[0].classList.add('error');
    document.getElementsByClassName('results')[0].classList.add('text-align-center');
    document.getElementsByClassName('liga-nav')[0].style.display = 'none';
}



//display match results
function showMatch(data) {
    let html = '';
    html += `
        <h1 class="competition padding-left" id="${data.competition.code}">${data.competition.name}</h1>
    `;
    for (let i = 0; i < data.matches.length; i++) {
        html += `
            <div class="match inline-block padding-left">
        `;
        if(data.matches[i].score.winner == 'HOME_TEAM'){
            html += `
                <div class="team-name inline-block float-left bold">
                    ${data.matches[i].homeTeam.name}
                </div>
            `;
        }
        else {
            html += `
                <div class="team-name inline-block float-left">
                    ${data.matches[i].homeTeam.name}
                </div>
            `;
        }
        html += `
                    <div class="match-result inline-block float-left">
                        ${data.matches[i].score.fullTime.homeTeam}
                    </div>
            `;
        if(data.matches[i].score.winner == 'AWAY_TEAM'){
            html += `
                <div class="team-name inline-block float-left bold">
                    ${data.matches[i].awayTeam.name}
                </div>
            `;
        }
        else {
            html += `
                <div class="team-name inline-block float-left">
                    ${data.matches[i].awayTeam.name}
                </div>
            `;
        }
        html += `
                <div class="match-result inline-block float-left">
                    ${data.matches[i].score.fullTime.awayTeam}
                </div>
            </div><hr>
        `;
    }
    document.getElementsByClassName('results')[0].innerHTML += html;
}
//promise chain getting and displaying results by league
async function loadResults(){
    try{
        let arr = [];
        let data = await request('http://api.football-data.org/v2/competitions/?plan=TIER_ONE');
        parseData(data);
        showLeagueNavigation(competitions);
        for(let i = 0; i < competitions.length; i++){
            if(competitions[i].leagueName != 'UEFA Champions League' && competitions[i].leagueName != 'European Championship' && competitions[i].leagueName != 'FIFA World Cup'){
                arr.push(request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/matches/?matchday=${competitions[i].currentMatchDay}`));
                //data = await request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/matches/?matchday=${competitions[i].currentMatchDay}`);
                //showMatch(data);
            }
        }
        data = await Promise.all(arr);
        console.log(data);
        for(let i = 0; i < data.length; i++){
            showMatch(data[i]);
        }
        // data = await request('http://api.football-data.org/v2/competitions/PD/matches/?matchday=33');
        // showMatch(data,'spain');
        // data = await request('http://api.football-data.org/v2/competitions/PL/matches/?matchday=34');
        // showMatch(data, 'england');
        // data = await request('http://api.football-data.org/v2/competitions/BL1/matches/?matchday=29');
        // showMatch(data,'germany');
        // data = await request('http://api.football-data.org/v2/competitions/SA/matches/?matchday=33');
        // showMatch(data, 'italy');
        // data = await request('http://api.football-data.org/v2/competitions/FL1/matches/?matchday=32');
        // showMatch(data,'france');
    }
    catch (err) {
        handleError(err);
    }
}
function showLeagueNavigation(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].leagueName != 'European Championship' && data[i].leagueName != 'UEFA Champions League' && data[i].leagueName != 'FIFA World Cup'){
            document.getElementById('league-nav').innerHTML += `
                <a href=#${data[i].leagueID} class="a-block">${data[i].leagueName}</a>
            `;
        }
    }
}
const parseData = (data) => {
    for(let i = 0; i < data.count; i++){
        let obj = {};
        obj.leagueName = data.competitions[i].name;
        obj.leagueID = data.competitions[i].code;
        obj.currentMatchDay = data.competitions[i].currentSeason.currentMatchday - 1;
        competitions.push(obj);
    }
}
//promise chain getting and displaying standings by league
async function loadTables(){
    try{
        let arr = [];
        let data = await request('http://api.football-data.org/v2/competitions/?plan=TIER_ONE');
        parseData(data);
        showLeagueNavigation(competitions);
        for(let i = 0; i < competitions.length; i++){
            if(competitions[i].leagueName != 'UEFA Champions League' && competitions[i].leagueName != 'European Championship' && competitions[i].leagueName != 'FIFA World Cup'){
                arr.push(request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/standings`));
                //data = await request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/standings`);
                //showStandings(data);
            }
        }
        data = await Promise.all(arr);
        for(let i = 0; i < data.length; i++){
            showStandings(data[i]);
        }
    } catch(err) {
        handleError(err);
    }
}
// display standings
function showStandings(data){
    let standings = '';
    standings += `
    <h1 class="competition padding-left" id="${data.competition.code}">${data.competition.name}</h1>
                            <div class="numbers inline-block padding-left">Pos</div>
                            <div class="team-name-table inline-block">Team</div>
                            <div class="numbers inline-block text-align-center">W</div>
                            <div class="numbers inline-block text-align-center">D</div>
                            <div class="numbers inline-block text-align-center">L</div>
                            <div class="numbers inline-block text-align-center">GD</div>
                            <div class="numbers inline-block text-align-center">PTS</div>`;
    for(let i = 0; i < data.standings[0].table.length; i++){
        standings += `
        <div class="table-col">
        <div class="numbers inline-block padding-left">${data.standings[0].table[i].position}</div>
        <div class="team-name-table inline-block">${data.standings[0].table[i].team.name}</div>
        <div class="numbers inline-block text-align-center">${data.standings[0].table[i].won}</div>
        <div class="numbers inline-block text-align-center">${data.standings[0].table[i].draw}</div>
        <div class="numbers inline-block text-align-center">${data.standings[0].table[i].lost}</div>
        <div class="numbers inline-block text-align-center">${data.standings[0].table[i].goalDifference}</div>
        <div class="numbers inline-block text-align-center">${data.standings[0].table[i].points}</div>
        </div class="table-col">
        `;
    }
    document.getElementsByClassName('results')[0].innerHTML += standings;
}
// display details about selected club
function detailed(data) {
    let display = '';
    display += `
    <div id="club-details">
        <img src="${data.crestUrl}" height=400 alt="${data.name} crest" class="float-left">
        <div class="club-info">Club name: ${data.name}</div><br>
        <div class="club-info">Club short name: ${data.shortName}</div><br>
        <div class="club-info">Website: <a href="${data.website}" target="_blank">${data.website}</a></div><br>
        <div class="club-info">Founded: ${data.founded}</div><br>
        <div class="club-info">Venue: ${data.venue}</div><br>
    </div>
    <div class="player-info winner">Player name</div>
    <div class="player-info winner">Position</div>
    <div class="player-info winner">Date of birth</div>
    <div class="player-info winner">Nationality</div>
    `;
    for (let i = 0; i < data.squad.length; i++) {
        display += `
            <div class="player-info">${data.squad[i].name}</div>
            `;
        if (data.squad[i].role == 'COACH') {
            display += `
            <div class="player-info">Coach</div>`;
        } else {
            display += `
            <div class="player-info">${data.squad[i].position}</div>
            `;
            }
        display += `
            <div class="player-info">${showDate(data.squad[i].dateOfBirth)}</div>
            <div class="player-info">${data.squad[i].nationality}</div>
        `;
    }
    document.getElementById('team-details').innerHTML = display;
}
//gets team from choosen league
async function listTeams(){
    try {
        let data = await request(`http://api.football-data.org/v2/competitions/${document.getElementById('league').value}/teams`);
        optionTeams(data);
        document.getElementById('select-team').style.display = 'block';
    } catch(err) {
        handleError(err);
    }
}

function optionTeams(data) {
    let display = '';
    for(let i = 0; i < data.teams.length; i++){
    display +=`
        <option value="${data.teams[i].id}">${data.teams[i].name}</option>
    `;
    }
    document.getElementById('teams').innerHTML = display;
}

async function showTeamDetailed(){
    try{
        let data = await request(`http://api.football-data.org/v2/teams/${document.getElementById('teams').value}`);
        detailed(data);
    } catch(err) {
        handleError(err);
    }
}

function showDate(date){
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getUTCFullYear()}`;
}