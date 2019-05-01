let token = '4ab239f4b7de4e06a40b536dc77c3a4a';
let fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "X-Auth-Token": token,
    }    
}
const request = async(url) => {
    const response = await fetch(url,fetchOptions);
    const data = await response.json();
    return data;
}

function handleError(error){
    //TODO zavrsi ispis
}


//display match results
function showMatch(data, id) {
    let html = '';
    for(let i = 0; i < data.matches.length; i++){
        if(data.matches[i].score.fullTime.homeTeam == null || data.matches[i].score.fullTime.awayTeam == null){
            html += `
                <div id="${data.matches[i].id}" class="match" onclick="request('http://api.football-data.org/v2/matches/${data.matches[i].id}',detailed)">
                    <div class="team-name">
                        ${data.matches[i].homeTeam.name}
                    </div>
                    <div class="score">
                        NOT FINISHED 
                    </div>
                    <div class="team-name away">
                        ${data.matches[i].awayTeam.name}
                    </div>
                </div><hr>
            `;
        }
        else {
            if (data.matches[i].score.winner == 'HOME_TEAM') {
                html += `
                <div id="${data.matches[i].id}" class="match" onclick="request('http://api.football-data.org/v2/matches/${data.matches[i].id}',detailed)">
                    <div class="winner team-name">
                        ${data.matches[i].homeTeam.name}
                    </div>
                    <div class="score">
                        ${data.matches[i].score.fullTime.homeTeam} : ${data.matches[i].score.fullTime.awayTeam} 
                    </div>
                    <div class="team-name away">
                        ${data.matches[i].awayTeam.name}
                    </div>
                </div><hr>
            `;
            } else if (data.matches[i].score.winner == 'AWAY_TEAM') {
                html += `
            <div id="${data.matches[i].id}" class="match" onclick="request('http://api.football-data.org/v2/matches/${data.matches[i].id}', detailed)">
                <div class="team-name">
                    ${data.matches[i].homeTeam.name}
                </div>
                <div class="score">
                    ${data.matches[i].score.fullTime.homeTeam} : ${data.matches[i].score.fullTime.awayTeam} 
                </div>
                <div class="winner team-name away">
                    ${data.matches[i].awayTeam.name}
                </div>
            </div><hr>
        `;
            } else {
                html += `
            <div id="${data.matches[i].id}" class="match" onclick="request('http://api.football-data.org/v2/matches/${data.matches[i].id}', detailed)">
                <div class="team-name">
                    ${data.matches[i].homeTeam.name}
                </div>
                <div class="score">
                    ${data.matches[i].score.fullTime.homeTeam} : ${data.matches[i].score.fullTime.awayTeam} 
                </div>
                <div class="team-name away">
                    ${data.matches[i].awayTeam.name}
                </div>
            </div><hr>
        `;
            }
        }
        }
    document.getElementById(id).innerHTML += html;
}
//promise chain getting and displaying results by league
async function loadResults(){
    try{
        let data = await request('http://api.football-data.org/v2/competitions/PD/matches/?matchday=33');
        showMatch(data,'spain');
        data = await request('http://api.football-data.org/v2/competitions/PL/matches/?matchday=34');
        showMatch(data, 'england');
        data = await request('http://api.football-data.org/v2/competitions/BL1/matches/?matchday=29');
        showMatch(data,'germany');
        data = await request('http://api.football-data.org/v2/competitions/SA/matches/?matchday=33');
        showMatch(data, 'italy');
        data = await request('http://api.football-data.org/v2/competitions/FL1/matches/?matchday=32');
        showMatch(data,'france');
    }
    catch (err) {
        console.log(err);
    }
}
//promise chain getting and displaying standings by league
async function loadTables(){
    try{
        let data = await request('http://api.football-data.org/v2/competitions/PD/standings');
        showStandings(data, 'spain');
        data = await request('http://api.football-data.org/v2/competitions/PL/standings');
        showStandings(data, 'england');
        data = await request('http://api.football-data.org/v2/competitions/BL1/standings');
        showStandings(data, 'germany');
        data = await request('http://api.football-data.org/v2/competitions/SA/standings');
        showStandings(data, 'italy');
        data = await request('http://api.football-data.org/v2/competitions/FL1/standings');
        showStandings(data, 'france');
    } catch(err) {
        console.log(err);
    }
}
// display standings
function showStandings(data, id){
    let standings = '';
    standings += `
    <div class="numbers inline-block">Pos</div>
                            <div class="team inline-block">Team</div>
                            <div class="numbers inline-block">PG</div>
                            <div class="numbers inline-block">W</div>
                            <div class="numbers inline-block">D</div>
                            <div class="numbers inline-block">L</div>
                            <div class="numbers inline-block">GF</div>
                            <div class="numbers inline-block">GA</div>
                            <div class="numbers inline-block">GD</div>
                            <div class="numbers inline-block">PTS</div>`;
    for(let i = 0; i < data.standings[0].table.length; i++){
        standings += `
        <div class="table-col">
        <div class="numbers inline-block">${data.standings[0].table[i].position}</div>
        <div class="team inline-block">${data.standings[0].table[i].team.name}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].playedGames}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].won}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].draw}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].lost}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].goalsFor}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].goalsAgainst}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].goalDifference}</div>
        <div class="numbers inline-block">${data.standings[0].table[i].points}</div>
        </div class="table-col">
        `;
    }
    document.getElementById(id).innerHTML += standings;
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
        console.log(err);
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
        console.log(err);
    }
}

function showDate(date){
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getUTCFullYear()}`;
}