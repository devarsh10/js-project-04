let math = Math.round(Math.random() * 100 + 1);

const userIp = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const guessSlot = document.querySelector('.guesses');
const remainingGuess = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const div = document.createElement('div');

let prevGuess = [];
let numGuess = 0;

let playGame = true; //Why? Idk

if (playGame) {
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const guess = parseInt(userIp.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        console.log("Please do not enter NaN!");
    } else if(guess < 1){
        console.log("Please enter no. greater than 1");
    } else if(guess > 100){
        console.log("Please enter no. less than 100!");
    } else{
        prevGuess.push(guess);
        if(numGuess === 10){ //change made here >10 to === 11
            cleanUp();
            displayMessage(`The number which you were not able to guess was, ${math}`);
            endGame();
        } else{
            cleanUp(guess);
            checkGuess(guess); 
        }
    }
}

function checkGuess(guess){
    if(guess == math){
        displayMessage(`Congo! You guessed it right.`);
        endGame();
    } else if(guess < math){
        displayMessage('You guessed it too low!');
    } else if(guess > math){
        displayMessage('You guessed it too High!');
    }
}

function cleanUp(guess){
    userIp.value = ""
    guessSlot.innerHTML += `${guess}   `
     //changes made here from below 11 - numguess line to above it.
    remainingGuess.innerHTML = `${10 - numGuess}`;
    numGuess++;
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userIp.value = "";
    userIp.setAttribute('disabled','')
    div.classList.add('button')
    div.innerHTML = (`<button id="newGame">Start New Game</button>`)
    startOver.appendChild(div)
    playGame = false;
    console.log(prevGuess)
    newGame();
}


function newGame(){
    const newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener('click', function(){
        math = Math.round(Math.random() * 100 + 1);
        prevGuess = []
        numGuess = 1;
        guessSlot.innerHTML = '';
        remainingGuess.innerHTML = `${11 - numGuess}`;
        userIp.removeAttribute('disabled')
        startOver.removeChild(div);
        playGame = true;
    })
}

