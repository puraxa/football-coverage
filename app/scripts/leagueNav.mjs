export function showLeagueNavigation(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].leagueName != 'European Championship' && data[i].leagueName != 'UEFA Champions League' && data[i].leagueName != 'FIFA World Cup'){
            document.getElementById('league-nav').innerHTML += `
                <a href=#${data[i].leagueID} class="a-block">${data[i].leagueName}</a>
            `;
        }
    }
}