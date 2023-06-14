// Fetch elements to manipulate
let timer = document.querySelector('.timer');
let score = document.querySelector('.score');
let button = document.querySelector('button');
let holes = document.querySelectorAll('.hole');
let moles = document.querySelectorAll('.mole');
// Variable declarations
let lastIndex;
let countDown_timer;
let popUp_timer;
let timeOver = false;
let gameTimer;
// TODO:Func to implement countdown
function countDown() {
    countDown_timer = setInterval(() => {
        if (timer.textContent == 0) {
            clearInterval(countDown_timer)
            return;
        }
        timer.textContent--    }, 1000);
}
// TODO: Func to implement mole popup
function popUp() {
    let holeIndex = randomPopUp();
    const randomtime = randomTimer(2000, 500);
    holes[holeIndex].classList.add("up");
    popUp_timer = setTimeout(() => {
        holes[holeIndex].classList.remove("up");
        if (timeOver == false) {
            popUp();
        }
        // if(!timeOver) popUp();  
        }, randomtime);
}
// TODO: Func to randomise mole popup
function randomPopUp() {
    let index = Math.floor(Math.random() * holes.length);
    if (lastIndex == index) {
        return randomPopUp();
    }
    lastIndex = index;
    return index;
}
function randomTimer(maximum = 1000, minimum = 100) {
    const popUpTime = Math.round(Math.random() * (maximum - minimum) + minimum);
    return popUpTime;
}
// TODO: Func to set the play sound
function playPop() {
    const audio = new Audio("pop.mp3");
    audio.currentTime = 0;
    audio.play();
}
// TODO: Func to implement mole whack
function whack(event) {
    // checking the bot  
    if (!event.isTrusted) return;
    score.textContent++;
    playPop();
    this.parentNode.classList.remove("up");
}
// TODO: Func to start game
function startGame() {
    holes.forEach(hole => hole.classList.remove("up"));
    score.textContent = 0;
    timer.textContent = 10;
    timeOver = false;
    clearInterval(countDown_timer);
    clearTimeout(popUp_timer);
    clearTimeout(gameTimer);
    popUp();
    countDown();
    gameTimer = setTimeout(() => timeOver = true, 10000);
}
moles.forEach(mole => mole.addEventListener("click", whack));
button.addEventListener("click", startGame);