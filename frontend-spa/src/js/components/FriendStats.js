export default function FriendStats(playtimeTwoWeeks, playtimeForever) {
    return `
    <h3>Your Friend</h3>
    <p class="two-week-playtime">Your friend has played ${playtimeTwoWeeks} hours in the last two weeks.</p>
    <p class="forever-playtime">Your friend has ${playtimeForever} hours total for this game.</p>
    `
}