const userName = document.getElementById('username')
const saveScorebt = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScore = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH = 5;
finalScore.innerText = mostRecentScore
userName.addEventListener('keyup', () => {
    // console.log(userName.value)
    saveScorebt.disabled = !userName.value
})

 let saveScore = e => {
    console.log("click")
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        named: userName.value
    }

    highScore.push(score)

    highScore.sort((a, b) => {
        b.score - a.score
    })
    highScore.splice(5)
    localStorage.setItem("highScores",JSON.stringify(highScore))
    window.location.assign("/");
    console.log(highScore)
};