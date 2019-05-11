function detailed(data) {
    let display = '';
    display += `
    <div id="club-details">
        <img src="${data.crestUrl}" alt="${data.name} crest" class="club-crest">
        <div>
        <div class="club-info inline-block">Club name: ${data.name}</div><br>
        <div class="club-info inline-block">Club short name: ${data.shortName}</div><br>
        <div class="club-info inline-block">Website: <a href="${data.website}" target="_blank">${data.website}</a></div><br>
        <div class="club-info inline-block">Founded: ${data.founded}</div><br>
        <div class="club-info inline-block">Venue: ${data.venue}</div><br>
        </div>
    </div>
    <div class="player-info winner inline-block">Player name</div>
    <div class="player-info winner inline-block">Position</div>
    <div class="player-info winner inline-block dis-none">Date of birth</div>
    <div class="player-info winner inline-block">Nationality</div>
    `;
    for (let i = 0; i < data.squad.length; i++) {
        display += `
            <div class="player-info inline-block">${data.squad[i].name}</div>
            `;
        if (data.squad[i].role == 'COACH') {
            display += `
            <div class="player-info inline-block">Coach</div>`;
        } else {
            display += `
            <div class="player-info inline-block">${data.squad[i].position}</div>
            `;
            }
        display += `
            <div class="player-info inline-block dis-none">${showDate(data.squad[i].dateOfBirth)}</div>
            <div class="player-info inline-block">${data.squad[i].nationality}</div>
        `;
    }
    document.getElementById('team-details').innerHTML = display;
}
async function loadTeams(){
    try{
        let data = await request('http://api.football-data.org/v2/competitions/?plan=TIER_ONE');
        parseData(data);
        optionLeague(competitions);
        listTeams();
    } catch(err) {
        handleError(err);
    }
}
async function listTeams(){
    try {
        let data = await request(`http://api.football-data.org/v2/competitions/${document.getElementById('league').value}/teams`);
        optionTeams(data);
        document.getElementById('select-team').style.display = 'block';
    } catch(err) {
        handleError(err);
    }
}

function optionLeague(data) {
    let html = ``;
    for(let i = 0; i < data.length; i++){
        if(competitions[i].leagueName != 'UEFA Champions League' && competitions[i].leagueName != 'European Championship' && competitions[i].leagueName != 'FIFA World Cup'){
            html += `
                <option value="${data[i].leagueID}">${data[i].leagueName}</option>
            `;
        }
    }
    document.getElementById('league').innerHTML = html;
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

export {optionTeams, optionLeague, listTeams, loadTeams, detailed, showTeamDetailed, showDate};