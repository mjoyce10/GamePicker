export default function MainUserStats(playtimeTwoWeeks, playtimeForever) {
    return `
    <h3>You</h3>
    <p class="two-week-playtime">You have played ${playtimeTwoWeeks} hours in the last two weeks.</p>
    <p class="forever-playtime">You have ${playtimeForever} hours total for this game.</p>
    `
}