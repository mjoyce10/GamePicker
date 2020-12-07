export default function EnterSteamID() {
    return `
    <h2 class="enter-steam-id-title">Enter your Steam ID</h2>
    <div class="images-and-input">
        <div class="fruits">
            <img class="cherry fruit" src="../../../images/cherry.png"/>
            <img class="peach fruit" src="../../../images/peach.png"/>
            <img class="strawberry fruit" src="../../../images/strawberry.png"/>
        </div>
    <div class="input-and-recents">
        <div class="steam-id-container">
            <div class="inner-steam-id-container">
                <input class="steam-id-input" placeholder="Steam ID" type="text"/>
                <img class="steam-id-button" src="../../../images/quarter_slot.jpg"/>
            </div>
        </div>
        <h2 class="recent-users-heading">Recent Players</h2>
        <div class="recent-users"></div>
    </div>
    <div class="fruits">
        <img class="cherry fruit" src="../../../images/cherry.png"/>
        <img class="peach fruit" src="../../../images/peach.png"/>
        <img class="strawberry fruit" src="../../../images/strawberry.png"/>
    </div>
    </div>
    `
}