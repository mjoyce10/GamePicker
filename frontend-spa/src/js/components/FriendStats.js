export default function FriendStats(friendName, playtimeTwoWeeks, playtimeForever) {
    return `
    <h3>${friendName}</h3>
    <p class="two-week-playtime">${friendName} has played ${playtimeTwoWeeks} hours in the last two weeks.</p>
    <p class="forever-playtime">${friendName} has ${playtimeForever} hours total for this game.</p>
    `
}