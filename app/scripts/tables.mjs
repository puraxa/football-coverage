export async function loadTables(){
    try{
        let arr = [];
        let data = await request('http://api.football-data.org/v2/competitions/?plan=TIER_ONE');
        parseData(data);
        showLeagueNavigation(competitions);
        for(let i = 0; i < competitions.length; i++){
            if(competitions[i].leagueName != 'UEFA Champions League' && competitions[i].leagueName != 'European Championship' && competitions[i].leagueName != 'FIFA World Cup'){
                arr.push(request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/standings`));
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

export function showStandings(data){
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