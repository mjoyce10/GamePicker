import Header from './components/Header';
import Home from './components/Home'
import FriendsList from './components/FriendsList';
import GameShuffler from './components/GameShuffler';

export default () => {
    header();
    home();
}

const appElement = document.querySelector('.app');

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
    })
}

function socialClick() {
    const socialElement = document.querySelector('.social');
    socialElement.addEventListener('click', function() {
        appElement.innerHTML = FriendsList();
    })
}