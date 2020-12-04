import Header from './components/Header';
import EnterSteamID from './components/EnterSteamID'
import FriendsListResults from './components/FriendsListResults';
import GamesOwned from './components/GamesOwned';
import ShuffleResult from './components/ShuffleResult';
import SoloOrSocial from './components/SoloOrSocial';
import CompareGames from './components/CompareGames';

export default () => {
    header();
    enterSteamID();
}

const steamAPIKey = 'C376A469E8668097F10078BB1A8220EA';
const appElement = document.querySelector('.app');
var gamePossibilities = [];
var mainUserGames = [];
var friendsListArray = [];
var gameMatches = []
const defaultGameImage = "../../images/default.jpg";
let mainUserSteamID = "";
let returnToFriendsListElement = "";

function header() {
    const headerElement = document.querySelector('.header');
    headerElement.innerHTML = Header();
    navHome();
}

function enterSteamID() {
    appElement.innerHTML = EnterSteamID();
    saveSteamID();
}

function reenterSteamID() {
    const reenterElement = document.querySelector('.re-enter');
    reenterElement.addEventListener('click', function(){
        enterSteamID();
    })
}

function soloOrSocial() {
    appElement.innerHTML = SoloOrSocial()
    displayUserNickname();
    socialClick();
    soloClick();
    reenterSteamID();
}

function navHome(){
    const navHomeElement = document.querySelector('.nav-home')
    navHomeElement.addEventListener('click', function() {
        soloOrSocial();
        deleteReturnToFriendsListButton()
    })
}

function saveSteamID() {
    const saveIDButton = document.querySelector('.steam-id-button')
    saveIDButton.addEventListener('click', function() {
        mainUserSteamID = document.querySelector('.steam-id-input').value;
        console.log(mainUserSteamID)
        soloOrSocial();
    })
}

function soloClick() {
    const soloElement = document.querySelector('.solo');
    soloElement.addEventListener('click', function(){
        getGamesOwned(mainUserSteamID);
    })
}

function socialClick() {
    const socialElement = document.querySelector('.social');
    socialElement.addEventListener('click', function() {
        getFriendsList(mainUserSteamID);    
    })
}

function displayUserNickname() {
    fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPIKey}&steamids=${mainUserSteamID}`)
    .then(response => response.json())
    .then(result => {
        const userWelcomeElement = document.querySelector('.welcome-header')
        const userAvatarElement = document.querySelector('.user-avatar')
        const userAvatar = result.response.players[0].avatarfull
        const userName = result.response.players[0].personaname
        console.log(userName)
        userWelcomeElement.innerHTML = `Welcome, ${userName}`
        if(userAvatar === 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg') {
            userAvatarElement.setAttribute("src", '../../images/default-avatar.png')
        }
        else {
            userAvatarElement.setAttribute("src", userAvatar)
        }
    })
}

function getFriendsList(steamID) {
    fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${steamAPIKey}&steamid=${steamID}&relationship=friend`)
    .then(response => response.json())
    .then(results => {
        friendsListArray.length = 0;
        console.log(results.friendslist.friends[0].steamid)
        appElement.innerHTML = FriendsListResults()
        deleteReturnToFriendsListButton()
        results.friendslist.friends.forEach(element => {
            const friendsSteamId = element.steamid
            friendsListArray.push(friendsSteamId)
        })
        getFriendsListNames();
    })
    .catch(err => console.log(err))
    console.log(friendsListArray)
}

function getFriendsListNames() {
    console.log(friendsListArray)
    const friendsListCommas = friendsListArray.join(",")
    console.log(friendsListCommas)
    const friendsDiv = document.querySelector('.friends-div')
    fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPIKey}&steamids=${friendsListCommas}`)
    .then(response => response.json())
    .then(results => {
        results.response.players.forEach(element => {
            console.log(element.steamid)
            const friendsListDiv = document.createElement("DIV")
            friendsListDiv.setAttribute("class", "friend-div")
            friendsListDiv.setAttribute("id", element.steamid)
            console.log(friendsListDiv.id)
            const friendsListElement = document.createElement("P")
            friendsListElement.setAttribute("class", "friend-name")
            const friendsSteamName = element.personaname
            friendsListElement.innerHTML = friendsSteamName
            const friendsAvatarElement = document.createElement("IMG")
            friendsAvatarElement.setAttribute("class", "friend-avatar")
            friendsAvatarElement.setAttribute("src", element.avatarmedium)
            friendsListDiv.appendChild(friendsAvatarElement)
            friendsListDiv.appendChild(friendsListElement)
            friendsDiv.appendChild(friendsListDiv)
        })
        getFriendsGames();
    })
    .catch(err => console.log(err))
}

function getGamesOwned(steamID) {
    console.log(steamID);
    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${steamID}&format=json&include_appinfo=1&include_played_free_games=1`)
    .then(response => response.json())
    .then(results => {
        console.log(results)
        appElement.innerHTML = GamesOwned()
        gamesOwnedHeaderPersonalization(steamID)
        addReturnToFriendsListButton(steamID)
        addCompareGamesButton(steamID)
        const allGamesDiv = document.querySelector('.games')
        if(results.response.games !== undefined) {
        results.response.games.forEach(element => {
            const gameDiv = document.createElement("DIV")
            gameDiv.setAttribute("class", "game-div")
            const gameName = element.name;
            if(!gameName.includes("Public Test")) {
            const gameNameElement = document.createElement("P");
            gameNameElement.setAttribute("class", "game-name")
            gameNameElement.innerHTML = gameName;
            gameDiv.appendChild(gameNameElement)
            const gameLogo = element.img_logo_url;
            const imgURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${element.appid}/${gameLogo}.jpg`
            const gameImageElement = document.createElement("IMG");
            gameImageElement.setAttribute("class", "game-logo")
            setDefaultImage(gameImageElement, imgURL, gameLogo)
            gameDiv.appendChild(gameImageElement)
            allGamesDiv.appendChild(gameDiv)
        }
        });
    }
        else {
            const compareGamesDiv = document.querySelector('.buttons')
            const compareGamesButton = document.querySelector('.compare-games-element')
            compareGamesDiv.removeChild(compareGamesButton)
            const noGamesImage = document.createElement("IMG")
            noGamesImage.setAttribute("class", "no-games-image")
            noGamesImage.setAttribute("src", "../../images/no-games.png")
            const noGamesDiv = document.querySelector('.no-games-div')
            noGamesDiv.appendChild(noGamesImage)
        }
        gamePossibilities = results.response.games;
        shuffleButton(gamePossibilities)
    })
    .catch(err => console.log(err))
}

function shuffleGames(array){
    const shuffleResultElement = document.querySelector('.game-choice')
    const playTimeElement = document.querySelector('.play-time')
    let arrayPosition = Math.floor(Math.random()* array.length);
    shuffleResultElement.innerText = `${array[arrayPosition].name}`
    let playTime = (array[arrayPosition].playtime_forever/60).toFixed(2);
    playTimeDisplay(playTimeElement, playTime);
    const gameImage = document.querySelector('.game-choice-image')
    const gameLogo = array[arrayPosition].img_logo_url
    const imgURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${array[arrayPosition].appid}/${gameLogo}.jpg`
    setDefaultImage(gameImage, imgURL, gameLogo)
}

function playTimeDisplay(playTimeElement, playTime){
    if(playTime > 0){
        playTimeElement.innerText = `You have played this game for ${playTime} hours.`
    }
    else {
        playTimeElement.innerText = "You have never played this game."
    }
}

function shuffleButton(array) {
    const shuffleButtonElement = document.querySelector('.shuffle-btn')
    shuffleButtonElement.addEventListener("click", function(){
        console.log("shuffleButton")
        console.log(array)
    appElement.innerHTML = ShuffleResult()
    shuffleGames(array)
    shuffleButton(array)
    })
}

function setDefaultImage(gameImage, imgURL, gameLogo) {
    if (gameLogo !== "") {
        gameImage.setAttribute("src", imgURL)
    }
    else {
        gameImage.setAttribute("src", defaultGameImage)
    }
}

function getFriendsGames() {
    const friendDiv = document.querySelectorAll('.friend-div')
    friendDiv.forEach(element => {
        element.addEventListener('click', function() {
        console.log(element.id)
        getGamesOwned(element.id)
        })
    })
}

function gamesOwnedHeaderPersonalization(steamID) {
    fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPIKey}&steamids=${steamID}`)
        .then(response => response.json())
        .then(results => {
            const gamesOwnedHeader = document.querySelector('.games-owned-header')
            gamesOwnedHeader.innerHTML = `List of Games Owned by ${results.response.players[0].personaname}`
        })
}

function addReturnToFriendsListButton(steamID) {
    const nav = document.querySelector('.nav')
    if(steamID !== mainUserSteamID && nav.childElementCount === 1){
        returnToFriendsListElement = document.createElement("P")
        returnToFriendsListElement.innerText = "Return to Friends List"
        returnToFriendsListElement.setAttribute("class", "return-to-friends-list-element")
        nav.appendChild(returnToFriendsListElement);
        returnToFriendsList();
    }
}

function deleteReturnToFriendsListButton() {
    const nav = document.querySelector('.nav')
    if(nav.childElementCount === 2) {
    const returnToFriendsListElement = document.querySelector('.return-to-friends-list-element')
    nav.removeChild(returnToFriendsListElement)
    }
}

function returnToFriendsList() {
    const returnToFriendsListElement = document.querySelector('.return-to-friends-list-element')
    returnToFriendsListElement.addEventListener('click', function() {
        getFriendsList(mainUserSteamID);
    })
}

function addCompareGamesButton(steamID) {
    if (steamID !== mainUserSteamID){
        const compareGamesElement = document.createElement("BUTTON")
        compareGamesElement.innerText = "Compare Games"
        compareGamesElement.setAttribute("class", "compare-games-element")
        const shuffleButton = document.querySelector('.shuffle-btn')
        const buttonsDiv = document.querySelector('.buttons')
        buttonsDiv.appendChild(compareGamesElement)
        buttonsDiv.removeChild(shuffleButton)
        compareGamesDisplay(compareGamesElement)
    }
}

function compareGamesDisplay(compareGamesElement) {
    compareGamesElement.addEventListener("click", function(){
    appElement.innerHTML = CompareGames()
    compareGames()
    shuffleButton(gameMatches)
    })
}

function compareGames() {
    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${mainUserSteamID}&format=json&include_appinfo=1&include_played_free_games=1`)
    .then(response => response.json())
    .then(results => {
        mainUserGames = results.response.games
        console.log(mainUserGames)
        gameMatches.length = 0;
        getMatches()
        if(gameMatches.length !== 0) {
        gameMatches.forEach(game => {
            const gameMatchesDiv = document.createElement("DIV")
            gameMatchesDiv.setAttribute("class", "game-match")
            const gameMatchElement = document.createElement("P")
            gameMatchElement.setAttribute("class", "game-match-element")
            gameMatchElement.innerText = game.name
            const gameMatchLogo = document.createElement("IMG")
            gameMatchLogo.setAttribute("class", "game-match-logo")
            const gameLogo = game.img_logo_url
            const imgURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${gameLogo}.jpg`
            console.log(imgURL)
            gameMatchLogo.setAttribute("src", imgURL)
            const allGameMatchesDiv = document.querySelector('.game-matches')
            gameMatchesDiv.appendChild(gameMatchElement)
            gameMatchesDiv.appendChild(gameMatchLogo)
            allGameMatchesDiv.appendChild(gameMatchesDiv)
        })
        }
        else {
            const shuffleButton = document.querySelector('.shuffle-btn')
            const buttonsDiv = document.querySelector('.buttons')
            buttonsDiv.removeChild(shuffleButton)
            const noGamesInCommon = document.createElement("P")
            const allGameMatchesDiv = document.querySelector('.game-matches')
            noGamesInCommon.innerText = "None."
            allGameMatchesDiv.appendChild(noGamesInCommon)
        }
    })
    .catch(err => console.log(err))
}

function getMatches() {
        for (let i=0; i < gamePossibilities.length; i++) {
        for (let x=0; x < mainUserGames.length; x++) {
            if (gamePossibilities[i].appid === mainUserGames[x].appid) {
                gameMatches.push(gamePossibilities[i])
            }
        }
    }
    console.log(gameMatches)
}