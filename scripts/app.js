let token = '4ab239f4b7de4e06a40b536dc77c3a4a';

function request(url){
    let client = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        client.open('GET', url, true);
        client.setRequestHeader('X-Auth-Token', token);
        client.send();
        client.onreadystatechange = () => {
            if(client.readyState == 4 && client.status == 200){
                let data = JSON.parse(client.responseText);
                resolve(data);
            }
            if(client.readyState == 4 && client.status != 200){
                let error = JSON.parse(client.responseText);
                reject(new Error(error.message));
            }
        }
    })
//    .then(callback)
//    .catch(handleError);
}

function handleError(error){
    console.log(error);
}

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

function loadResults(){
    request('http://api.football-data.org/v2/competitions/PD/matches/?matchday=33')
    .then((data) => showMatch(data,'spain'))
    .then(request('http://api.football-data.org/v2/competitions/PL/matches/?matchday=34')
    .then((data) => showMatch(data,'england')))
    .then(request('http://api.football-data.org/v2/competitions/BL1/matches/?matchday=29')
    .then((data) => showMatch(data,'germany')))
    .then(request('http://api.football-data.org/v2/competitions/SA/matches/?matchday=33')
    .then((data) => showMatch(data,'italy')))
    .then(request('http://api.football-data.org/v2/competitions/FL1/matches/?matchday=32')
    .then((data) => showMatch(data,'france')))
    .catch(handleError);
}

function loadTables(){
    request('http://api.football-data.org/v2/competitions/PD/standings')
    .then((data) => showStandings(data,'spain'))
    .then(request('http://api.football-data.org/v2/competitions/PL/standings')
    .then((data) => showStandings(data,'england')))
    .then(request('http://api.football-data.org/v2/competitions/BL1/standings')
    .then((data) => showStandings(data,'germany')))
    .then(request('http://api.football-data.org/v2/competitions/SA/standings')
    .then((data) => showStandings(data,'italy')))
    .then(request('http://api.football-data.org/v2/competitions/FL1/standings')
    .then((data) => showStandings(data,'france')))
    .catch(handleError);
}

function showStandings(data, id){
    console.log(data);
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

function listTeams(){
    request(`http://api.football-data.org/v2/competitions/${document.getElementById('league').value}/teams`)
    .then(optionTeams)
    .then(() => document.getElementById('select-team').style.display = 'block')
    .catch(handleError);
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

function showTeamDetailed(){
    request(`http://api.football-data.org/v2/teams/${document.getElementById('teams').value}`)
    .then(detailed)
    .catch(handleError);
}

function showDate(date){
    let newDate = new Date(date);
    console.log(newDate);
    return `${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getUTCFullYear()}`;
}