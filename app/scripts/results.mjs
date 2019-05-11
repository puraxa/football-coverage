export function showMatch(data) {
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
        if(data.matches[i].score.fullTime.homeTeam == null){
            html += `
            <div class="match-result inline-block float-left">
                NOT
            </div>
            `;
        }
        else{
            html += `
                        <div class="match-result inline-block float-left">
                            ${data.matches[i].score.fullTime.homeTeam}
                        </div>
                `;
        }
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
        if(data.matches[i].score.fullTime.awayTeam == null){
            html += `
                <div class="match-result inline-block float-left">
                    PLAYED
                </div>
                </div><hr>
            `;
        }
        else{
            html += `
                    <div class="match-result inline-block float-left">
                        ${data.matches[i].score.fullTime.awayTeam}
                    </div>
                </div><hr>
            `;
        }
    }
    document.getElementsByClassName('results')[0].innerHTML += html;
}


export async function loadResults(){
    try{
        let arr = [];
        let data = await request('http://api.football-data.org/v2/competitions/?plan=TIER_ONE');
        parseData(data);
        showLeagueNavigation(competitions);
        for(let i = 0; i < competitions.length; i++){
            if(competitions[i].leagueName != 'UEFA Champions League' && competitions[i].leagueName != 'European Championship' && competitions[i].leagueName != 'FIFA World Cup'){
                arr.push(request(`http://api.football-data.org/v2/competitions/${competitions[i].leagueID}/matches/?matchday=${competitions[i].currentMatchDay}`));
            }
        }
        data = await Promise.all(arr);
        for(let i = 0; i < data.length; i++){
            showMatch(data[i]);
        }
    }
    catch (err) {
        handleError(err);
    }
}