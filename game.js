const question = document.getElementById('Question')
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progFull = document.getElementById('progressfull')
const loader=document.getElementById('loader')
const container=document.querySelector('.container')
// console.log(choices)

let curquestion = {};
let acceptans = false;
let score = 0
let questionCounter = 0;
let availableQuestion = []

let questions = [""];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple").then(res=>{
   
    return res.json()
}).then(load =>{
   questions= load.results.map(loadqn=>{
        const formatqn={
            question:loadqn.question
        }
        const ans=[...loadqn.incorrect_answers ]
        formatqn.answer=Math.floor(Math.random()*3)+1
        ans.splice(formatqn.answer-1,0,loadqn.correct_answer)
        ans.forEach((choice,index)=>{
            formatqn["choice"+(index+1)]=choice
        })
        return formatqn
    })
  
    startGame()
})
console.log("lkdc")
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions]
    // console.log(availableQuestion)
    getNewQuestion();
    container.classList.remove("hidden")
    loader.classList.add("hidden")
}

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
    localStorage.setItem('mostRecentScore',score)
        return window.location.assign("/end.html")
    }
    questionCounter++
    progText.innerHTML = "Question" + questionCounter + "/" + MAX_QUESTION
    progFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    curquestion = availableQuestion[questionIndex]
    question.innerText = curquestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = curquestion["choice" + number]
    })
    availableQuestion.splice(questionIndex, 1)
    acceptans = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptans) return;
        acceptans = false
        const selectedchoice = e.target;
        const selectedAnswer = selectedchoice.dataset['number'];

        let classToApply = 'incorrect';
        if (selectedAnswer == curquestion.answer) {
            classToApply = 'correct'
        }
        if (classToApply === 'correct') {
            incScore(CORRECT_BONUS)
        }
        selectedchoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})
incScore = num => {
    score += num;
    scoreText.innerText = score;
}







