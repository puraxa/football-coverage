export const parseData = (data) => {
    for(let i = 0; i < data.count; i++){
        let obj = {};
        obj.leagueName = data.competitions[i].name;
        obj.leagueID = data.competitions[i].code;
        obj.currentMatchDay = data.competitions[i].currentSeason.currentMatchday - 1;
        competitions.push(obj);
    }
}