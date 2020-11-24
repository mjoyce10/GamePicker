export default function GamesOwned(games){
    return `
    <h2>List of Games</h2>
    <div class="games">
    ${games.map(game => {
        return `
        <div class="game">
        <p class="game-name">${game.appid}</p>
        </div>
        `
    }).join('')}
    </div>
    `
}