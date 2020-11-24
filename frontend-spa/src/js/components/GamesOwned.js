export default function GamesOwned(games, apiKey){
    return `
    <h2>List of Games</h2>
    <div class="games">
    ${games.map(game => {
        return `
        <div id="${game.appid}">
        ${fetch(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${game.appid}`)
        .then(response => response.json())
        .then(game =>{ 
            console.log(game.game.gameName)
            const gameNameElement = document.querySelector(`#${game.appid}`)
           // gameNameElement.forEach(element => {
              gameNameElement.innerText = game.game.gameName
            //})
            //return `
            //<p class="game-name">${game.game.gameName}</p>
            
            //`
        })
        .catch(err => console.log(err))
        }
        
        </div>
        `
    }).join('')}
    </div>
    `
}