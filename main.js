let rankingData=[];
let usingData =[];
let url;
let data;
let gameFixtures = [];
let homeTeamData;
let awayTeamData;
let leagueFixture = 4335;
let leagueId = 39;
let page = 1;
let dataLength;
let leagueBtn = document.querySelectorAll(".menus button");
leagueBtn.forEach((item)=>item.addEventListener("click", (event)=>renderByLeague(event)));
let pageBtn = document.querySelectorAll(".pagination");
pageBtn.forEach((item)=>item.addEventListener("click", (event)=>pageClick(event)));
let bodySize = document.getElementsByName("body")[0];
window.onresize = (event) =>{
    let innerWidth = window.innerWidth;
    innerWidth <= "1280" ? dataLength = 4 : dataLength = 6;
}

const renderByLeague = (event) => {
    let leagueName = event.target.textContent;
    console.log(leagueName);
    switch (leagueName) {
        case " Premier League":
            leagueFixture = 4335;
            leagueId = 39;
            break;
        case " LaLiga":
            leagueFixture = 4378;
            leagueId = 140;
            break;
        case " Seria A":
            leagueFixture = 4399;
            leagueId = 135;
            break;
        case " Bundesliga":
            leagueFixture = 4346;
            leagueId = 78;
            break;
        case " Ligue 1":
            leagueFixture = 4347;
            leagueId = 61;
            break;
    }
    console.log(leagueFixture);
    renderRankTable();
    renderScoreRank();
    lastGame();
}
const renderRankTable = async() => {
    url = new URL(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${leagueId}`);

    let header = new Headers({
        'X-RapidAPI-Key': 'aa20214fcamsh905caccfec4d5cep11381cjsn54f631234476',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
    let response = await fetch(url, {headers: header});
    let data = await response.json();
    rankingData = data.response[0].league.standings[0];
    let rankingHTML = '';
    rankingHTML = `
        <table>
            <th class="fixed" align="center">순위</th>
            <th class="fixed" align="center">팀명</th>
            <th class="fixed" align="center">경기</th>
            <th class="fixed" align="center">승점</th>
            <th class="fixed" align="center">승</th>
            <th class="fixed" align="center">무</th>
            <th class="fixed" align="center">패</th>
            <th class="fixed" align="center">득실차</th>
    `
    for(let i=0; i<rankingData.length; i++){
        rankingHTML += `
        <tr>
            <td>${rankingData[i].rank}</td>
            <td><img src="${rankingData[i].team.logo}" class="logo"/> ${rankingData[i].team.name}</td>
            <td>${rankingData[i].all.played}</td>
            <td>${rankingData[i].points}</td>
            <td>${rankingData[i].all.win}</td>
            <td>${rankingData[i].all.draw}</td>
            <td>${rankingData[i].all.lose}</td>
            <td>${rankingData[i].goalsDiff}</td>
        </tr>
        `
    }
    rankingHTML += `</table>`
    document.querySelector(".ranking-list").innerHTML = rankingHTML;
}

const renderScoreRank = async() =>{
    url = new URL(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueId}&season=2022`);
    let header = new Headers({
        'X-RapidAPI-Key': 'aa20214fcamsh905caccfec4d5cep11381cjsn54f631234476',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
    let response = await fetch(url, {headers: header});
    data = await response.json();
    usingData = data.response;
    let scoreHTML = '';
    scoreHTML = `
    <table>
        <th align="center">순위</th>
        <th align="center">선수명</th>
        <th align="center">팀명</th>
        <th align="center">경기</th>
        <th align="center">득점</th>
    `
    for(let i=0; i<10; i++){
        scoreHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${usingData[i].player.name}</td>
                <td>${usingData[i].statistics[0].team.name}</td>
                <td>${usingData[i].statistics[0].games.appearences}</td>
                <td>${usingData[i].statistics[0].goals.total}</td>
            </tr>
        `
    }
    scoreHTML += '</table>';
    document.querySelector(".score-assist-rank").innerHTML = scoreHTML;
    document.querySelector(".assist-sub").style.color = 'lightgrey';
    document.querySelector(".score-sub").style.color = 'black';
}

const renderAssistRank = async() => {
    url = new URL(`https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=${leagueId}&season=2022`);
    let header = new Headers({
        'X-RapidAPI-Key': 'aa20214fcamsh905caccfec4d5cep11381cjsn54f631234476',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
    let response = await fetch(url, {headers: header});
    data = await response.json();
    usingData = data.response;
    let assistHTML = '';
    assistHTML = `
    <table>
        <th align="center">순위</th>
        <th align="center">선수명</th>
        <th align="center">팀명</th>
        <th align="center">경기</th>
        <th align="center">도움</th>
    `
    for(let i=0; i<10; i++){
        assistHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${usingData[i].player.name}</td>
                <td>${usingData[i].statistics[0].team.name}</td>
                <td>${usingData[i].statistics[0].games.appearences}</td>
                <td>${usingData[i].statistics[0].goals.assists}</td>
            </tr>
        `
    }
    assistHTML += '</table>';
    document.querySelector(".score-assist-rank").innerHTML = assistHTML;
    document.querySelector(".assist-sub").style.color = 'black';
    document.querySelector(".score-sub").style.color = 'lightgrey';
}
const lastGame = async() =>{
    let url = new URL(`https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${leagueFixture}/last/18?timezone=Europe%2FLondon`);
    let header = new Headers({
        'X-RapidAPI-Key': 'aa20214fcamsh905caccfec4d5cep11381cjsn54f631234476',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
    let response = await fetch(url, {headers: header});
    let data = await response.json();
    let gameData = data.api.fixtures;
    let gameDataHTML = '';
    gameDataHTML = '<div class="row">';
    gameFixtures = [];
    dataLength = 6;
    let i = 0; //pagination
    let iLength = dataLength;
    if(page == 2){
        i = dataLength;
        iLength = dataLength*2;
    }else if(page == 3){
        i = dataLength*2;
        iLength = dataLength*3;
    }
    for(i; i<iLength; i++){
        gameDataHTML += `
        <button class="col-lg-2 col-sm-6 team-match" onclick="gameStatistics(${gameData[i].fixture_id})">
            <div class="match-date">${gameData[i].event_date.substr(5,11).replace("T"," ")}</div>
            <div class="logo-box">
                <img class="match-logo" src="${gameData[i].homeTeam.logo}">
                <img class="match-logo" src="${gameData[i].awayTeam.logo}">
            </div>
            <div class="score-box">
                <div>${gameData[i].goalsHomeTeam}</div>
                <div>${gameData[i].goalsAwayTeam}</div>
            </div>
        </button>
        `
        gameFixtures.push(gameData[i].fixture_id);
    }

    gameDataHTML += '</div>';
    document.querySelector(".last-game").innerHTML = gameDataHTML;

    gameStatistics(gameData[i-6].fixture_id);
    renderPage();
}
const renderPage = () =>{
    pageHTML = '';
    for(let j=0;j<3;j++){
        pageHTML += `
            <li class="page-item ${(j+1)==page?"active":""}">  
                <div class="page-link">${j+1}</div>
            </li>
        `
    }
    document.querySelector(".pagination").innerHTML = pageHTML;
}
const pageClick=(e)=>{
    console.log(e.target.textContent);
    page = e.target.textContent;
    lastGame();
}
const gameStatistics = async(id) => {
    let url = new URL(`https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${id}`);
    let header = new Headers({
        'X-RapidAPI-Key': 'aa20214fcamsh905caccfec4d5cep11381cjsn54f631234476',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
    let response = await fetch(url, {headers: header});
    let data = await response.json();
    homeTeamData = data.response[0];
    awayTeamData = data.response[1];
    let staticDataArray = [9,2,0,7,8,6,12,10,11];
    let staticTypeArray = ["점유율","슈팅","유효슈팅","코너킥","오프사이드","파울","선방","경고","퇴장"];
    let staticHTML = '';
    staticHTML = `
        <div class="static-score-box">
            <div class="text-center">
                <img class="match-logo" src="${homeTeamData.team.logo}"/>
                <div class="fw-bold">${homeTeamData.team.name}</div>
            </div>
            <div class="text-black-50">VS</div>
            <div class="text-center">
                <img class="match-logo" src="${awayTeamData.team.logo}"/> 
                <div class="fw-semibold">${awayTeamData.team.name}</div>
            </div>
        </div>
    `
    for(let i=0; i<staticDataArray.length;i++){
        staticHTML+=`<div class="static-team-box" id="box-${staticDataArray[i]}"></div>`
    }
    document.querySelector(".game-statistics").innerHTML = staticHTML;
    staticHTML = ``;

    for(let i=0; i<staticDataArray.length; i++){
        staticHTML=`
            <div class="home-percentage-box"><div class="home-possession-value" id="home-value-${staticDataArray[i]}"></div></div>
            <div>${homeTeamData.statistics[staticDataArray[i]].value==null?0:homeTeamData.statistics[staticDataArray[i]].value}</div>
            <div class="text-black-50">${staticTypeArray[i]}</div>
            <div>${awayTeamData.statistics[staticDataArray[i]].value==null?0:awayTeamData.statistics[staticDataArray[i]].value}</div>
            <div class="away-percentage-box"><div class="away-possession-value" id="away-value-${staticDataArray[i]}"></div></div>
        `
        document.getElementById(`box-${staticDataArray[i]}`).innerHTML = staticHTML;
        fillingIn(staticDataArray[i]);  
        staticHTML='';
    }
}
const fillingIn = (i) =>{
    if(i == 9){
        document.getElementById(`home-value-${i}`).style.width = homeTeamData.statistics[i].value;
        document.getElementById(`away-value-${i}`).style.width = awayTeamData.statistics[i].value;
    }else{
        document.getElementById(`home-value-${i}`).style.width = homeTeamData.statistics[i].value*3 + "%";
        document.getElementById(`away-value-${i}`).style.width = awayTeamData.statistics[i].value*3 + "%";
    }
}
const openSideNav =()=>{
    document.querySelector(".side-menu").style.width = "50px";
}
const closeSideNav =()=>{
    document.querySelector(".side-menu").style.width = "0px";
}
//footballAPI();
//getRenderAPI();
renderRankTable();
renderScoreRank();
lastGame();