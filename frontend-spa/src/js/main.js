import Header from './components/Header';
import Home from './components/Home'
import FriendsList from './components/FriendsList';
import GameShuffler from './components/GameShuffler';
import GamesOwned from './components/GamesOwned';
import ShuffleResult from './components/ShuffleResult';

export default () => {
    header();
    home();
}

const steamAPIKey = 'C376A469E8668097F10078BB1A8220EA';
const appElement = document.querySelector('.app');
var gamePossibilities = [];

function header() {
    const headerElement = document.querySelector('.header');
    headerElement.innerHTML = Header();
    homeNav();
}

function home() {
    appElement.innerHTML = Home();
    soloClick();
    socialClick();
}

function homeNav() {
    const homeNavElement = document.querySelector('.nav-home');
    homeNavElement.addEventListener('click', function(){
        home();
    })
}

function soloClick() {
    const soloElement = document.querySelector('.solo');
    soloElement.addEventListener('click', function(){
        appElement.innerHTML = GameShuffler();
        idButton();
    })
}

function socialClick() {
    const socialElement = document.querySelector('.social');
    socialElement.addEventListener('click', function() {
        appElement.innerHTML = FriendsList();
        idButton();
    })
}

function idButton() {
    const idButtonElement = document.querySelector('.steam-id-button');
    idButtonElement.addEventListener('click', function() {
        const steamID = document.querySelector('.steam-id-input').value;
        console.log(steamID);
        getGamesOwned(steamID);
    })
}

function getFriendsList(steamID) {
    fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${steamAPIKey}&steamid=${steamID}&relationship=friend`)
    .then(response => response.json())
    .then(results => console.log(results.friendslist.friends[0]))
    .catch(err => console.log(err))
}

function getGamesOwned(steamID) {
    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${steamID}&format=json&include_appinfo=1&include_played_free_games=1`)
    .then(response => response.json())
    .then(results => {
        console.log(results.response.games)
        appElement.innerHTML = GamesOwned()
        const gameDiv = document.querySelector('.games')
        results.response.games.forEach(element => {
            console.log(element.name)
            const gameName = element.name;
            const gameNameElement = document.createElement("P");
            console.log(gameNameElement)
            gameNameElement.innerHTML = gameName;
            gameDiv.appendChild(gameNameElement)
        });
        gamePossibilities = results.response.games;
        shuffleButton()
    })
    .catch(err => console.log(err))
}

function shuffleGames(){
    const shuffleResultElement = document.querySelector('.game-choice')
    let arrayPosition = Math.floor(Math.random()* gamePossibilities.length);
    shuffleResultElement.innerText = `${gamePossibilities[arrayPosition].name}`
    const gameImage = document.querySelector('.game-choice-image')
    const imgURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${gamePossibilities[arrayPosition].appid}/${gamePossibilities[arrayPosition].img_logo_url}.jpg`
    gameImage.setAttribute("src", imgURL)
}

function shuffleButton() {
    const shuffleButtonElement = document.querySelector('.shuffle-btn')
    shuffleButtonElement.addEventListener("click", function(){
        console.log("shuffleButton")
        console.log(gamePossibilities)
    appElement.innerHTML = ShuffleResult()
    shuffleGames()
    shuffleButton()
    })
}